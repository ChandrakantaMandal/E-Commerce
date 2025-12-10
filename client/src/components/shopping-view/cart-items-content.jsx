import { Minus, Plus, Trash } from "lucide-react";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { deleteCartItem, updateCartItemQty } from "@/store/shop/cart-slice";
import { toast } from "sonner";

function UserCartItemsContent({ cartItem }) {
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const safeTitle = (val) => {
    if (val == null) return "";
    if (typeof val === "string") return val;
    if (typeof val === "object") return val.title ?? JSON.stringify(val);
    return String(val);
  };

  function handleCartItemDelete(getCartItem) {
    const productId = getCartItem?.productid || getCartItem?.productId;
    dispatch(deleteCartItem({ userId: user?.id, productId })).then((data) => {
      if (data?.payload?.success) {
        toast("Cart item is deleted successfully");
      }
    });
  }

  function handleUpdateQuantity(getCartItem, typeOfAction) {
    const productId = getCartItem?.productid || getCartItem?.productId;
    dispatch(
      updateCartItemQty({
        userId: user?.id,
        productId,
        quantity:
          typeOfAction === "plus"
            ? getCartItem?.quantity + 1
            : getCartItem?.quantity - 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        toast("Cart item is updated successfully");
      }
    });
  }
  return (
    <div className="flex items-center space-x-4">
      <img
        src={cartItem.image}
        alt={cartItem?.title}
        className="h-20 w-20 object-cover rounded"
      />
      <div className="flex-1">
        <h3 className="font-extrabold">{safeTitle(cartItem?.title)}</h3>
        <div className=" gap-2 flex items-center mt-1">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-full"
            disabled={cartItem?.quantity === 1}
            onClick={() => handleUpdateQuantity(cartItem, "minus")}
          >
            <Minus className="h-4 w-4" />
            <span className="sr-only">Decrease</span>
          </Button>
          <span className="font-semibold">{cartItem?.quantity}</span>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-full"
            onClick={() => handleUpdateQuantity(cartItem, "plus")}
          >
            <Plus className="h-4 w-4" />
            <span className="sr-only">Increase</span>
          </Button>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <p className="font-semibold">
          {(
            (cartItem?.salePrice > 0 ? cartItem?.salePrice : cartItem?.price) *
            cartItem?.quantity
          ).toFixed(2)}
        </p>
        <Trash
          onClick={() => handleCartItemDelete(cartItem)}
          className="cursor-pointer mt-1"
          size={20}
        />
      </div>
    </div>
  );
}

export default UserCartItemsContent;
