import React, { useState } from "react";
import accImg from "../../assets/account.jpg";
import Address from "@/components/shopping-view/address";
import { useDispatch, useSelector } from "react-redux";
import UserCartItemsContent from "@/components/shopping-view/cart-items-content";
import { Button } from "@/components/ui/button";
import { createNewOrder } from "@/store/shop/order-slice";
import { toast } from "sonner";


const ShoppinhCheckOut = () => {
  const { cartItems } = useSelector((state) => state.shoppingCart);
  const { user } = useSelector((state) => state.auth);
  const { approvalURL } = useSelector((state) => state.shopOrder);
  const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null);
  const [isPaymentStart, setIsPaymemntStart] = useState(false);
  const dispatch = useDispatch();
  

  const totalCartAmount =
    cartItems && cartItems.items && cartItems.items.length > 0
      ? cartItems.items.reduce((sum, currentItem) => {
          const price = Number(
            currentItem?.salePrice > 0
              ? currentItem.salePrice
              : currentItem.price || 0
          );
          const qty = Number(currentItem?.quantity || 0);
          return sum + price * qty;
        }, 0)
      : 0;

  const handleInitiateCOD = () => {
    if (cartItems.length === 0) {
      toast("Your cart is empty. Please add items to proceed");

      return;
    }
    if (currentSelectedAddress === null) {
      toast("Please select one address to proceed");

      return;
    }

    const orderData = {
      userId: user?.id,
      cartId: cartItems?._id,
      cartItems: cartItems.items.map((singleCartItem) => ({
        productId: singleCartItem?.productId,
        title: singleCartItem?.title,
        image: singleCartItem?.image,
        price:
          singleCartItem?.salePrice > 0
            ? singleCartItem?.salePrice
            : singleCartItem?.price,
        quantity: singleCartItem?.quantity,
      })),
      addressInfo: {
        addressId: currentSelectedAddress?._id,
        address: currentSelectedAddress?.address,
        city: currentSelectedAddress?.city,
        pincode: currentSelectedAddress?.pincode,
        phone: currentSelectedAddress?.phone,
        notes: currentSelectedAddress?.notes,
      },
      orderStatus: "pending",
      paymentMethod: "COD",
      paymentStatus: "pending",
      totalAmount: totalCartAmount,
      orderDate: new Date(),
      orderUpdateDate: new Date(),
    };

    dispatch(createNewOrder(orderData)).then((data) => {
      console.log(data);
      if (data?.payload?.success) {
        setIsPaymemntStart(true);
      } else {
        setIsPaymemntStart(false);
      }
    });
  };

  if (isPaymentStart) {
    window.location.href = "/shop/payment-success";
  }

  return (
    <div className="flex flex-col">
      <div className="relative h-[300px] overflow-hidden">
        <img
          src={accImg}
          className="h-full w-full object-cover object-center"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5 p-5">
        <Address
          selectedId={currentSelectedAddress}
          setCurrentSelectedAddress={setCurrentSelectedAddress}
        />
        <div className="flex flex-col gap-4">
          {cartItems && cartItems.items && cartItems.items.length > 0
            ? cartItems.items.map((item) => (
                <UserCartItemsContent
                  key={item._id || item.productId || Math.random()}
                  cartItem={item}
                />
              ))
            : null}
          <div className="mt-8 w-full">
            <div className="flex justify-between mb-4">
              <span className="font-bold">Total</span>
              <span className="font-bold">${totalCartAmount}</span>
            </div>
            <div className="mt-2 w-full">
              <Button onClick={handleInitiateCOD} className="w-full">
                Checkout with COD
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppinhCheckOut;
