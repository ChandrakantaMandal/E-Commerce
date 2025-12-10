import Address from "../../model/Address.js";

const addAddress = async (req, res) => {
  try {
    const { userId, address, city, pincode, phone, notes } = req.body;

    if (!userId || !address || !city || !pincode || !phone || !notes) {
      return res.status(400).json({
        success: false,
        message: "Invalid data provide",
      });
    }

    const newlyCreatedAddress = new Address({
      userId,
      address,
      city,
      pincode,
      phone,
      notes,
    });

    await newlyCreatedAddress.save();

    res.status(201).json({
      success: true,
      data: newlyCreatedAddress,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error to add address",
    });
  }
};

const fetchAllAddress = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User id is requied",
      });
    }

    const addressList = await Address.find({ userId });

    res.status(201).json({
      success: true,
      data: addressList,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error to fetch address",
    });
  }
};

const editAddress = async (req, res) => {
  try {
    const { userId, addressId } = req.params;
    const formData = req.body;

    if (!userId || !addressId) {
      return res.status(400).json({
        success: false,
        message: "User and Address id is requied",
      });
    }

    const address = await Address.findOneAndUpdate(
      {
        _id: addressId,
        userId,
      },
      formData,
      { new: true }
    );

    if ( !address) {
      return res.status(404).json({
        success: false,
        message: "Address not found",
      });
    }

    res.status(201).json({
      success: true,
      data: address,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error to edit address",
    });
  }
};

const deleteAddress = async (req, res) => {
  try {
    const { userId, addressId } = req.params;

    if (!userId || !addressId) {
      return res.status(400).json({
        success: false,
        message: "User and Address id is requied",
      });
    }

    const address= await Address.findOneAndDelete({_id:addressId,userId})
    
    if ( !address) {
      return res.status(404).json({
        success: false,
        message: "Address not found",
      });
    }

    res.status(200).json({
      success: true,
      message:"Address deleted successfully"
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error to delete address",
    });
  }
};

export { deleteAddress, editAddress, addAddress, fetchAllAddress };
