import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import UserCartItemsContent from "./cart-items-content";

function UserCartWrapper({ cartItems, setOpenCartSheet }) {
  const navigate = useNavigate();
  const totalCartAmmount =
    cartItems && cartItems.length > 0
      ? cartItems.reduce((sum, currentItem) => {
          const price =
            currentItem?.salePrice > 0
              ? currentItem.salePrice
              : currentItem.price || 0;
          const qty = currentItem?.quantity || 0;
          return sum + price * qty;
        }, 0)
      : 0;
  return (
    <SheetContent>
      <SheetHeader>
        <SheetTitle>Your Cart</SheetTitle>
      </SheetHeader>
      <div className="mt-8 space-y-4">
        {cartItems && cartItems.length > 0
          ? cartItems.map((item) => (
              <UserCartItemsContent
                key={item.productid || item.productId || item.productid}
                cartItem={item}
              />
            ))
          : null}
      </div>
      <div className="mt-8 space-y-4">
        <div className="flex justify-between">
          <span className="font-bold">Total</span>
          <span className="font-bold">{totalCartAmmount}</span>
        </div>
      </div>
      <Button
        onClick={() => {
          navigate("/shop/checkout");
          setOpenCartSheet(false);
        }}
        className="w-full mt-5"
      >
        Checkout
      </Button>
    </SheetContent>
  );
}

export default UserCartWrapper;
