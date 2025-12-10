import { useState } from "react";
import { data, Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

import CommonFrom from "../../components/common/from";
import { loginFormControls } from "../../config/index";
import { loginUser } from "@/store/auth-slice";

const initialState = {
  email: "",
  password: "",
};

function AuthLogin() {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function onSubmit(e) {
    e.preventDefault();
    dispatch(loginUser(formData)).then((data) => {
      if (data?.payload?.success) {
        toast.success(data?.payload?.message);
        // Redirect based on user role
        if (data?.payload?.user?.role === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/shop/home");
        }
      } else {
        toast.error(data?.payload?.message);
      }
    });
  }

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h2 className="mt-6 text-3xl font-bold tracking-tight text-foreground">
          Sign In to your account
        </h2>
        <p>
          Don't have an account?
          <Link
            to="/auth/register"
            className="text-primary font-medium hover:underline ml-2"
          >
            Register
          </Link>
        </p>
      </div>
      <CommonFrom
        formControls={loginFormControls}
        buttonText={"Sign In"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
    </div>
  );
}

export default AuthLogin;
