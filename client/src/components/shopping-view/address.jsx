import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import CommonForm from "../common/from";
import { addressFormControls } from "@/config";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewAddress,
  deleteAddress,
  editAddress,
  fetchAllAddresses,
} from "@/store/shop/address-slice";
import AddressCard from "./address-card";
import { toast } from "sonner";

const initialAddressFormData = {
  address: "",
  city: "",
  phone: "",
  pincode: "",
  notes: "",
};

function Address({ setCurrentSelectedAddress, selectedId }) {
  const [formData, setFormData] = useState(initialAddressFormData);
  const [currentEditedId, setCurrentEditedId] = useState(null);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { addressList } = useSelector((state) => state.shoppingAddress);

  function handleManageAddress(event) {
    event.preventDefault();
    if (addressList && addressList.length >= 3 && currentEditedId === null) {
      setFormData(initialAddressFormData);
      toast("You can add 3 max addresses");
      return;
    }

    if (currentEditedId !== null) {
      dispatch(
        editAddress({
          userId: user?.id,
          addressId: currentEditedId,
          formData,
        })
      ).then((data) => {
        if (data?.payload?.success) {
          dispatch(fetchAllAddresses(user?.id));
          setCurrentEditedId(null);
          setFormData(initialAddressFormData);
          toast("Address updated successfully");
        }
      });
    } else {
      dispatch(
        addNewAddress({
          ...formData,
          userId: user?.id,
        })
      ).then((data) => {
        if (data?.payload?.success) {
          dispatch(fetchAllAddresses(user?.id));
          setFormData(initialAddressFormData);
          toast("Address added successfully");
        }
      });
    }
  }

  function handleDeleteAddress(getCurrentAddress) {
    dispatch(
      deleteAddress({ userId: user?.id, addressId: getCurrentAddress?._id })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAllAddresses(user?.id));
        toast("Address deleted successfully");
      }
    });
  }

  function handleEditAddress(getCurrentAddress) {
    setCurrentEditedId(getCurrentAddress?._id);
    setFormData({
      ...formData,
      address: getCurrentAddress?.address,
      city: getCurrentAddress?.city,
      phone: getCurrentAddress?.phone,
      pincode: getCurrentAddress?.pincode,
      notes: getCurrentAddress?.notes,
    });
  }

  function isFormValid() {
    return Object.keys(formData)
      .map((key) => formData[key] !== "")
      .every((item) => item);
  }

  useEffect(() => {
    if (user?.id) dispatch(fetchAllAddresses(user?.id));
  }, [dispatch, user?.id]);
  return (
    <Card>
      <div className="mb-5 p-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
        {addressList && addressList.length > 0
          ? addressList.map((item) => (
              <AddressCard
                key={item._id || item.id}
                addressInfo={item}
                handleDeleteAddress={!setCurrentSelectedAddress ? handleDeleteAddress : null}
                handleEditAddress={!setCurrentSelectedAddress ? handleEditAddress : null}
                setCurrentSelectedAddress={setCurrentSelectedAddress}
                selectedId={selectedId}
              />
            ))
          : null}
      </div>
      {!setCurrentSelectedAddress ? (
        <>
          <CardHeader>
            <CardTitle>
              {currentEditedId !== null ? "Edit Address" : "Add New Address"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <CommonForm
              formControls={addressFormControls}
              formData={formData}
              setFormData={setFormData}
              buttonText={currentEditedId !== null ? "Edit" : "Add"}
              onSubmit={handleManageAddress}
              isBtnDisabled={!isFormValid()}
            />
          </CardContent>
        </>
      ) : null}
    </Card>
  );
}

export default Address;
