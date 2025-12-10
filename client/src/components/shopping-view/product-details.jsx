import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";
import { Separator } from "../ui/separator";
import { AvatarFallback, Avatar } from "../ui/avatar";
import { StarsIcon } from "lucide-react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { setProductDetails } from "@/store/shop/product-slice";
import StarRatingComponent from "../common/star-rating";
import { addReview, getReviews } from "@/store/shop/review-slice";

function ProductDetailsDialog({ open, setOpen, productDetails }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { reviews } = useSelector((state) => state.shopReview);
  const [isAdding, setIsAdding] = useState(false);
  const [reviewMsg, setReviewMsg] = useState("");
  const [rating, setRating] = useState(0);
  const navigate = useNavigate();

  function handleAddToCart(getCurrentProductId) {
    if (!user?.id) {
      navigate("/auth/login");
      return;
    }
    if (isAdding) return;
    setIsAdding(true);
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
      .finally(() => setIsAdding(false));
  }

  function handleRatingChange(getRating) {
    setRating(getRating);
  }

  function handleAddReview() {
    dispatch(
      addReview({
        productId: productDetails?._id,
        userId: user?.id,
        userName: user?.userName,
        reviewMessage: reviewMsg,
        reviewValue: rating,
      })
    ).then((data) => {
      if (data.payload.success) {
        setRating(0);
        setReviewMsg("");
        dispatch(getReviews(productDetails?._id));
        toast.success("Review added successfully");
      } else {
        setRating(0);
        setReviewMsg("");
        toast.error(data.payload.message);
      }
    });
  }

  useEffect(() => {
    if (productDetails !== null) dispatch(getReviews(productDetails?._id));
  }, [productDetails]);

  const averageReview =
    reviews && reviews.length > 0
      ? reviews.reduce((sum, reviewItem) => sum + reviewItem.reviewValue, 0) /
        reviews.length
      : 0;

  function handleDilogClose() {
    setOpen(false);
    dispatch(setProductDetails());
    setRating(0);
    setReviewMsg("");
  }

  const safeTitle = (val) => {
    if (val == null) return "";
    if (typeof val === "string") return val;
    if (typeof val === "object") return val.title ?? JSON.stringify(val);
    return String(val);
  };

  return (
    <Dialog open={open} onOpenChange={handleDilogClose}>
      <DialogContent className="grid grid-cols-2 gap-8 sm:p-2 max-w-[90vw] sm:max-w-[80vw] lg:max-w-[70vw]">
      <DialogTitle className="sr-only">Product Details</DialogTitle>
        <div className="relative overflow-hidden rounded-lg">
          <img
            src={productDetails?.image}
            alt={productDetails?.title}
            height={600}
            width={600}
            className="aspect-square w-full object-cover"
          />
        </div>
        <div className="">
          <div>
            <h1 className="text-xl font-extrabold">
              {safeTitle(productDetails?.title)}
            </h1>
            <p className="text-muted-foreground text-2xl mb-5 mt-4">
              {productDetails?.description}
            </p>
          </div>
          <div className="flex justify-center items-center">
            <p
              className={`${
                productDetails?.salePrice > 0 ? "line-through" : ""
              }text-3xl font-bold text-primary`}
            >
              ${productDetails?.price}
            </p>
            {productDetails?.salePrice > 0 ? (
              <p className="text-2xl font-bold text-muted-foreground">
                {productDetails?.salePrice}
              </p>
            ) : null}
          </div>
          <div className="flex items-center gap-2">
            <div className="flex gap-0.5 items-center">
              <StarRatingComponent rating={averageReview} />
            </div>
            <span className="text-muted-foreground">
              ({averageReview.toFixed(2)})
            </span>
          </div>
          <div className="mt-5 mb-5">
            <Button
              className="w-full"
              onClick={() => handleAddToCart(productDetails?._id)}
              disabled={isAdding}
            >
              {isAdding ? "Adding..." : "Add to Cart"}
            </Button>
          </div>
          <Separator />
          <div className="max-h-[300px] overflow-auto">
            <h2 className="text-xl font-bold mb-4">Reviews</h2>
            <div className="grid gap-6">
              {reviews && reviews.length > 0 ? (
                reviews.map((reviewItem) => (
                  <div className="flex gap-4">
                    <Avatar className="w-10 h-10 border">
                      <AvatarFallback>
                        {reviewItem?.userName[0].toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid gap-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold">{reviewItem?.userName}</h3>
                      </div>
                      <div className="flex gap-0.5 items-center">
                        <StarRatingComponent rating={reviewItem?.reviewValue} />
                      </div>
                      <p className="text-muted-foreground">
                        {reviewItem.reviewMessage}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <h1>No Reviews</h1>
              )}
            </div>
            <div className="mt-10 flex-col flex gap-2">
              <Label>Write a review</Label>
              <div className="flex gap-1">
                <StarRatingComponent
                  rating={rating}
                  handleRatingChange={handleRatingChange}
                />
              </div>
              <Input
                name="reviewMsg"
                value={reviewMsg}
                onChange={(event) => setReviewMsg(event.target.value)}
                placeholder="Write a review..."
              />
              <Button
                onClick={handleAddReview}
                disabled={reviewMsg.trim() === "" || rating === 0}
              >
                Submit
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ProductDetailsDialog;
