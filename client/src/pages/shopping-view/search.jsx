
import ProductDetailsDialog from "@/components/shopping-view/product-details";
import ShoppinhProductTile from "@/components/shopping-view/product-tile";
import { Input } from "@/components/ui/input";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { fetchProductsDetails } from "@/store/shop/product-slice";
import {
  getSearchResults,
  resetSearchResults,
} from "@/store/shop/search-slice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { toast } from "sonner";

function SearchProducts() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [keyword, setKeyword] = useState(searchParams.get("keyword") || "");
  const dispatch = useDispatch();
  const { searchResults } = useSelector((state) => state.shopSearch);
  const { productDetails } = useSelector((state) => state.shoppingProducts);

  const { user } = useSelector((state) => state.auth);

  const { cartItems } = useSelector((state) => state.shoppingCart);
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  console.log(searchResults, "searchResults");

  useEffect(() => {
    if (searchParams.get("keyword")) {
      setKeyword(searchParams.get("keyword"));
      dispatch(getSearchResults(searchParams.get("keyword")));
    } else {
      setKeyword("");
      dispatch(resetSearchResults());
    }
  }, [searchParams, dispatch]);

  function handleAddToCart(getCurrentProductId, getTotalStock) {
    console.log(cartItems);
    let getCartItems = cartItems.items || [];

    if (getCartItems.length) {
      const indexOfCurrentItem = getCartItems.findIndex(
        (item) => item.productId === getCurrentProductId
      );
      if (indexOfCurrentItem > -1) {
        const getQuantity = getCartItems[indexOfCurrentItem].quantity;
        if (getQuantity + 1 > getTotalStock) {
          toast({
            title: `Only ${getQuantity} quantity can be added for this item`,
            variant: "destructive",
          });

          return;
        }
      }
    }

    dispatch(
      addToCart({
        userId: user?.id,
        productId: getCurrentProductId,
        quantity: 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?.id));
        toast({
          title: "Product is added to cart",
        });
      }
    });
  }

  function handleGetProductDetails(getCurrentProductId) {
    console.log(getCurrentProductId);
    dispatch(fetchProductsDetails(getCurrentProductId));
  }

  useEffect(() => {
    if (productDetails !== null) setOpenDetailsDialog(true);
  }, [productDetails]);

  console.log(searchResults, "searchResults");

  return (
    <div className="container mx-auto md:px-6 px-4 py-8">
      <div className="flex justify-center mb-8">
        <div className="w-full flex items-center">
          <Input
            value={keyword}
            name="keyword"
            onChange={(event) => setKeyword(event.target.value)}
            className="py-6"
            placeholder="Search Products..."
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                const keyword = event.target.value;
                if (keyword && keyword.trim() !== "") {
                  setSearchParams(new URLSearchParams(`?keyword=${keyword}`));
                  dispatch(getSearchResults(keyword));
                }
              }
            }}
          />
        </div>
      </div>
      {!searchResults.length && keyword.trim() !== "" ? (
        <h1 className="text-5xl font-extrabold">No result found!</h1>
      ) : null}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {searchResults.map((item) => (
          <ShoppinhProductTile
            handleAddtoCart={handleAddToCart}
            product={item}
            handleGetProductDetails={handleGetProductDetails}
          />
        ))}
      </div>
      <ProductDetailsDialog
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetails}
      />
    </div>
  );
}

export default SearchProducts;
