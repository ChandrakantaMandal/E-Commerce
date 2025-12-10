import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

import CommonFrom from "../../components/common/from";
import { regesterFormControls } from "../../config/index";
import { registerUser } from "@/store/auth-slice/index";

const initialState = {
  email: "",
  username: "",
  password: "",
};

function AuthRegister() {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function onSubmit(e) {
    e.preventDefault();
    dispatch(registerUser(formData)).then((data) => {
      if (data?.payload?.success) {
        toast(data?.payload?.message);
        navigate("/auth/login");
      } else {
        toast(data?.payload?.message);
      }
    });
  }

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h2 className="mt-6 text-3xl font-bold tracking-tight text-foreground">
          Sign up for an account
        </h2>
        <p>
          Already have an account?
          <Link
            to="/auth/login"
            className="text-primary font-medium hover:underline ml-2"
          >
            Log in
          </Link>
        </p>
      </div>
      <CommonFrom
        formControls={regesterFormControls}
        buttonText={"Sign up"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
    </div>
  );
}

export default AuthRegister;
