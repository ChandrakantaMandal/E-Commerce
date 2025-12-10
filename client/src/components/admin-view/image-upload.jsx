import React, { useEffect, useRef } from "react";
import { Label } from "../ui/label";
import { FileIcon, Upload, UploadCloud, XIcon } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import { uploadImage } from "@/store/admin/product-slice";
import { toast } from "sonner";
import { Skeleton } from "../ui/skeleton";

const ProductImageUpload = ({
  imageFile,
  setImageFile,
  uploadedImageUrl,
  setUploadedImageUrl,
  setImageLoadingState,
  imageLoadingState,
  isEditMode,
  isCustomStyling = false,
}) => {
  const inputRef = useRef(null);
  const dispatch = useDispatch();

  function handleImageFileChange(event) {
    console.log(event.target.files);
    const selectFile = event.target.files?.[0];
    if (selectFile) setImageFile(selectFile);
  }

  function handleDragOver(event) {
    event.preventDefault();
  }
  function handleDrop(event) {
    event.preventDefault();
    const dropdeFile = event.dataTransfer.files?.[0];
    if (dropdeFile) setImageFile(dropdeFile);
  }

  function handleRemoveImage() {
    setImageFile(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  async function uploadedImageToCloudinary(imageFile) {
    setImageLoadingState(true);
    const formData = new FormData();
    formData.append("my_file", imageFile);
    const result = await dispatch(uploadImage(formData));

    if (result?.payload?.success) {
      setUploadedImageUrl(result.payload.result.url);
      setImageLoadingState(false);
      toast.success("Image uploaded successfully!");
    } else {
      setImageLoadingState(false);
      toast.error(result?.payload?.message || "Image uploaded failed!");
    }
  }

  useEffect(() => {
    if (imageFile) uploadedImageToCloudinary(imageFile);
  }, [imageFile]);

  return (
    <div className={`w-full  mt-4 ${isCustomStyling ? "" : "max-w-md mx-auto"}`}>
      <Label className="mb-2 text-lg font-semibold block">Upload Image</Label>
      <div
        onDragOver={handleDragOver}
        onDrag={handleDrop}
        className={`${
          isEditMode ? "opacity-60" : ""
        }border-2 border-dashed rounded-lg p-4`}
      >
        <Input
          type="file"
          id="image-upload"
          className="hidden"
          ref={inputRef}
          onChange={handleImageFileChange}
          disabled={isEditMode}
        />
        {!imageFile ? (
          <Label
            htmlFor="image-upload"
            className={`${
              isEditMode ? "cursor-not-allowed" : ""
            } flex h-48 w-full cursor-pointer flex-col items-center justify-center`}
          >
            <UploadCloud className="w-10 h-10 text-muted-foreground mb-2" />
            <span className="text-sm text-muted-foreground">
              Click to upload or drag and drop
            </span>
          </Label>
        ) : imageLoadingState ? (
          <Skeleton className="h-10 bg-gray-100" />
        ) : (
          <div className="flex flex-col items-center justify-center">
            {uploadedImageUrl && (
              <img
                src={uploadedImageUrl}
                alt="Uploaded"
                className="w-32 h-32 object-cover mb-2 rounded"
              />
            )}
            <div className="flex items-center">
              <FileIcon className="w-8 text-primary mr-2 h-8" />
              <p className="text-sm font-medium">{imageFile.name}</p>
              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground hover:text-foreground"
                onClick={handleRemoveImage}
              >
                <XIcon className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductImageUpload;
