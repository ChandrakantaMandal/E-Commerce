import ProductFilter from "@/components/shopping-view/filter";
import { Button } from "@/components/ui/button";
import { sortOptions } from "@/config";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowUpDownIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllFilteredProducts,
  fetchProductsDetails,
} from "@/store/shop/product-slice";
import ShoppinhProductTile from "@/components/shopping-view/product-tile";
import { useSearchParams } from "react-router-dom";
import ProductDetailsDialog from "@/components/shopping-view/product-details";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { toast } from "sonner";

function buildQueryString(filters) {
  const queryParams = [];

  for (const [key, value] of Object.entries(filters)) {
    if (Array.isArray(value) && value.length > 0) {
      const paramValue = value.join(",");
      queryParams.push(`${key}=${encodeURIComponent(paramValue)}`);
    }
  }

  return queryParams.join("&");
}

const ShoppinhListing = () => {
  const dispatch = useDispatch();
  const { productList, productDetails } = useSelector(
    (state) => state.shoppingProducts
  );

  const [addingIds, setAddingIds] = useState([]);
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [filters, setFilters] = useState({});
  const [serchParam, setSearchParam] = useSearchParams();
  const [sort, setSort] = useState(null);
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);

  function handleSort(value) {
    setSort(value);
  }

  function handleFilter(getSectionId, getCurrentOption) {
    let cpyFilter = { ...filters };
    const indexOfCurrentSection = Object.keys(cpyFilter).indexOf(getSectionId);

    if (indexOfCurrentSection === -1) {
      cpyFilter = {
        ...cpyFilter,
        [getSectionId]: [getCurrentOption],
      };
    } else {
      const indexOfCurrentOption =
        cpyFilter[getSectionId].indexOf(getCurrentOption);

      if (indexOfCurrentOption === -1)
        cpyFilter[getSectionId].push(getCurrentOption);
      else cpyFilter[getSectionId].splice(indexOfCurrentOption, 1);
    }
    setFilters(cpyFilter);
    sessionStorage.setItem("filters", JSON.stringify(cpyFilter));
  }

  function handleProductDetails(getCurrentProductId) {
    dispatch(fetchProductsDetails(getCurrentProductId));
  }

  function handleAddToCart(getCurrentProductId) {
    if (!user?.id) {
      navigate("/auth/login");
      return;
    }
    if (addingIds.includes(getCurrentProductId)) return;
    setAddingIds((s) => [...s, getCurrentProductId]);
    dispatch(
      addToCart({
        userId: user?.id,
        productId: getCurrentProductId,
        quantity: 1,
      })
    )
      .then((data) => {
        if (data?.payload?.success) {
          dispatch(fetchCartItems(user?.id));
          toast("Product is added to cart");
        }
      })
      .finally(() =>
        setAddingIds((s) => s.filter((id) => id !== getCurrentProductId))
      );
  }

  useEffect(() => {
    setSort("price-lowtohigh");
    setFilters(JSON.parse(sessionStorage.getItem("filters")) || {});
  }, []);

  useEffect(() => {
    if (filters && Object.keys(filters).length > 0) {
      const createQueryString = buildQueryString(filters);
      setSearchParam(new URLSearchParams(createQueryString));
    } else {
      setSearchParam("");
    }
  }, [filters]);

  //fetch all list
  useEffect(() => {
    if (filters !== null && sort !== null)
      dispatch(
        fetchAllFilteredProducts({ filterParams: filters, sortParams: sort })
      );
  }, [dispatch, sort, filters]);

  useEffect(() => {
    if (productDetails !== null) setOpenDetailsDialog(true);
  }, [productDetails]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 p-4 md-6">
      <ProductFilter filters={filters} handleFilter={handleFilter} />
      <div className="bg-background rounded-lg w-full shadow-sm">
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="text-lg font-extrabold">All Products</h2>
          <div className="flex items-center gap-3">
            <span className="text-muted-foreground">
              {productList.length} Products
            </span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1"
                >
                  <ArrowUpDownIcon className="h-4 w-4 " />
                  <span>Sort by</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuRadioGroup value={sort} onValueChange={handleSort}>
                  {sortOptions.map((option) => (
                    <DropdownMenuRadioItem value={option.id} key={option.id}>
                      {option.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
          {productList && productList.length > 0
            ? productList.map((productItem) => (
                <ShoppinhProductTile
                  key={productItem._id}
                  product={productItem}
                  handleProductDetails={handleProductDetails}
                  handleAddToCart={handleAddToCart}
                  isAdding={addingIds.includes(productItem._id)}
                />
              ))
            : null}
        </div>
      </div>
      <ProductDetailsDialog
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetails}
      />
    </div>
  );
};

export default ShoppinhListing;
