import { brandOptionsMap, categoryOptionsMap } from "@/config";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";

function ShoppinhProductTile({
  product,
  handleProductDetails,
  handleAddToCart,
  isAdding,
}) {
  const safeTitle = (val) => {
    if (val == null) return "";
    if (typeof val === "string") return val;
    if (typeof val === "object") return val.title ?? JSON.stringify(val);
    return String(val);
  };
  return (
    <Card className="w-full max-w-sm mx-auto">
      <div onClick={() => handleProductDetails(product?._id)}>
        <div className="relative">
          <img
            src={product?.image}
            alt={product?.title}
            className="w-full h-[300px] object-cover rounded-t-lg"
          />
          {product?.salePrice > 0 ? (
            <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
              Sale
            </Badge>
          ) : null}
        </div>
        <CardContent className="p-4">
          <h2 className="text-xl font-bold mb-2">
            {safeTitle(product?.title)}
          </h2>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[16px] text-muted-foreground">
              {categoryOptionsMap[product?.category]}
            </span>
            <span className="text-[16px] text-muted-foreground">
              {brandOptionsMap[product?.brand]}
            </span>
          </div>
          <div className="flex items-center justify-between mb-2">
            <span
              className={`${
                product?.salePrice > 0 ? "line-through" : ""
              }text-lg text-primary font-semibold`}
            >
              {product?.price}
            </span>
            {product?.salePrice > 0 ? (
              <span className="text-lg text-primary font-semibold">
                {product?.salePrice}
              </span>
            ) : null}
          </div>
        </CardContent>
      </div>
      <CardFooter>
        <Button
          onClick={() => handleAddToCart(product?._id)}
          className="w-full"
          disabled={!!isAdding}
        >
          {isAdding ? "Adding..." : "Add to cart"}
        </Button>
      </CardFooter>
    </Card>
  );
}

export default ShoppinhProductTile;
