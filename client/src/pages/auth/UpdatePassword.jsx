import React, { useState } from "react";
import { Button, Input, Logo } from "../../components";
import { IoMailOutline } from "react-icons/io5";
import { BiLockAlt } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {selectCurrentOtp, selectCurrentEmail} from "../../features/auth/authSlice";
import { setCredentials } from "../../features/auth/authSlice";
import { toast } from "react-toastify";
import useTitle from "../../hooks/useTitle";
import { useForgotPasswordMutation } from "../../features/auth/authApiSlice";

import "./Auth.css";
const UpdatePassword = () => {
  const [formDetails, setFormDetails] = useState({
    password: "",
    confirmPassword: "",
  });
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useTitle("ProjectHub - Reset Password");
  const curUserEmail = useSelector(selectCurrentEmail);
  const curUserOtp = useSelector(selectCurrentOtp);

  const handleChange = (e) => {
    setFormDetails({ ...formDetails, [e.target.id]: e.target.value });
  };
  const handleChange2 = (e) => {
    setFormDetails({ ...formDetails, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(formDetails.password !== formDetails.confirmPassword){
      toast.error("Passwords do not match");
      return;
    }
    console.log("curUserOtp", curUserOtp);
    console.log("curUserEmail", curUserEmail);
    try {
      console.log("curUserOtp", curUserOtp);
      console.log("curUserEmail", curUserEmail);
      const verificationData = {
        otp: curUserOtp,
        email: curUserEmail,
        password: formDetails.password,
      };
      console.log(verificationData);
      const userData = await toast.promise(
        forgotPassword({ verificationData }).unwrap(),
        {
          pending: "Please wait...",
          success: "Password updated successfully",
          error: "Password update failed",
        }
      );
      dispatch(setCredentials({ ...userData }));
      localStorage.setItem("persist", true);
      setFormDetails({ password: "", confirmPassword: "" });
      navigate("/");
    } catch (error) {
      toast.error(error.data);
      console.error(error);
    }
  };

  return (
    <section className="flex w-full h-screen">
      {/* Sign in form container */}
      <div className="basis-1/4 m-auto flex flex-col">
        <Logo customCss={"mx-auto md:mx-0"} />
        {/* Sign in form heading */}
        <div className="mt-12 mb-6 flex flex-col gap-3">
          <h2 className="text-center md:text-left font-bold text-3xl">
            Choose new password
          </h2>
          <p className="text-center md:text-left text-sm">
          Almost done. Enter your new password and you're all set.
          </p>
        </div>
        {/* Sign in form */}
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmit}
        >
          <Input
            type={"password"}
            id={"password"}
            icon={<BiLockAlt />}
            handleChange={handleChange}
            value={formDetails.password}
            label={"New Password"}
            placeholder={"At least 6 characters long"}
          />
          <Input
            type={"password"}
            id={"confirmPassword"}
            icon={<BiLockAlt />}
            handleChange={handleChange2}
            value={formDetails.confirmPassword}
            label={"Confirm New Password"}
            placeholder={"At least 6 characters long"}
          />
          <Button
            content={"Sign in"}
            type={"submit"}
            customCss={"mt-5 rounded-lg"}
            loading={isLoading}
          />
        </form>
      </div>
    </section>
  );
};

export default UpdatePassword;
