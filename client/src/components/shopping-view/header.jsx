import { HousePlug, LogOut, Menu, ShoppingCart, UserCog } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { Sheet, SheetTrigger, SheetContent } from "../ui/sheet";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "@/store/auth-slice";
import { categoryOptionsMap, shoppingViewHeaderMenuItems } from "@/config";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { DropdownMenuLabel } from "@radix-ui/react-dropdown-menu";
import UserCartWrapper from "./cart-wrapper";
import { fetchCartItems } from "@/store/shop/cart-slice";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Search } from "lucide-react";

function MenuItems() {
  const navigate = useNavigate();
  function handleNavigateToListingPage(getCurrentMenueItem) {
    sessionStorage.removeItem("filter");
    const currentFilter =
      getCurrentMenueItem.id !== "home"
        ? { category: [getCurrentMenueItem.id] }
        : null;
    sessionStorage.setItem("filters", JSON.stringify(currentFilter));
    navigate(getCurrentMenueItem.path);
  }
  return (
    <nav className="flex flex-col mb-3 lg:mb-0 lg:items-center gap-6 lg:flex-row">
      {shoppingViewHeaderMenuItems.map((item) => (
        <Label
          key={item.id}
          className="text-sm font-medium text-muted-foreground hover:text-foreground cursor-pointer"
          onClick={() => handleNavigateToListingPage(item)}
        >
          {item.label}
        </Label>
      ))}
    </nav>
  );
}

function HederRightContent() {
  const [openCartSheet, setOpenCartSheet] = useState(false);

  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shoppingCart);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(logoutUser()).then(() => {
      navigate("/auth/login");
    });
  }

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchCartItems(user.id));
    }
  }, [dispatch, user?.id]);

  return (
    <div className="flex lg:items-center lg:flex-row flex-col gap-4">
      <Sheet open={openCartSheet} onOpenChange={setOpenCartSheet}>
        <Button
          onClick={() => setOpenCartSheet(true)}
          variant="outline"
          size="icon"
        >
          <ShoppingCart className="w-6 h-6" />
          <span className="sr-only">User Cart</span>
        </Button>
        <UserCartWrapper
        setOpenCartSheet={setOpenCartSheet}
          cartItems={
            cartItems &&
            Array.isArray(cartItems.items) &&
            cartItems.items.length > 0
              ? cartItems.items
              : []
          }
        />
      </Sheet>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex items-center">
            <Avatar className="h-8 w-8 bg-black cursor-pointer">
              <AvatarFallback className="text-white bg-black font-extrabold">
                {user?.userName?.[0]?.toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" side="right">
          <DropdownMenuLabel>Logged in as {user?.userName}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => navigate("/shop/account")}>
            <UserCog className="mr-2 h-4 w-4" />
            Account
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            LogOut
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

const ShoppingHeader = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link to="/shop/home" className="flex items-center gap-2">
          <HousePlug className="h-6 w-6" />
          <span className="font-bold">Speed-Box Store</span>
        </Link>
        <div className="hidden lg:flex justify-center flex-1 px-10">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              className="pl-8"
              value={searchParams.get("keyword") || ""}
              onChange={(event) => {
                const newKeyword = event.target.value;
                setSearchParams(new URLSearchParams(`?keyword=${newKeyword}`));
              }}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  const keyword = searchParams.get("keyword");
                  if (keyword && keyword.trim() !== "") {
                    navigate(`/shop/search?keyword=${keyword}`);
                  }
                }
              }}
            />
          </div>
        </div>

        <div className="hidden lg:flex flex-row items-center gap-6"> {/* Added gap and container */}
          <MenuItems />
          <HederRightContent />
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="lg:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle Header Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-full max-w-xs">
            <MenuItems />
            <HederRightContent />
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default ShoppingHeader;
