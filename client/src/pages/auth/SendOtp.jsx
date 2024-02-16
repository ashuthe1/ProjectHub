import React, { useState } from "react";
import { Button, Input, Logo } from "../../components";
import { IoMailOutline } from "react-icons/io5";
import { BiLockAlt, BiArrowBack } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { useSendOtpMutation } from "../../features/auth/authApiSlice";
import { useDispatch } from "react-redux";
import { setEmail } from "../../features/auth/authSlice";
import { toast } from "react-toastify";
import useTitle from "../../hooks/useTitle";

import "./Auth.css";
const SendOtp = () => {
  const [formDetails, setFormDetails] = useState({
    email: "",
  });
  const [sendOtp, { isLoading }] = useSendOtpMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useTitle("ProjectHub - Send OTP");

  const handleChange = (e) => {
    setFormDetails({ ...formDetails, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userData = await toast.promise(
        sendOtp({ ...formDetails }).unwrap(),
        {
          pending: "Please wait...",
          success: "OTP Sent successfully",
          error: "OTP Send failed",
        }
      );
      dispatch(setEmail(formDetails.email));
      localStorage.setItem("persist", true);
      setFormDetails({ email: ""});
      navigate("/auth/verifyEmail");
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
          Reset your password
          </h2>
        </div>
        {/* Sign in form */}
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmit}
        >
          <Input
            type={"email"}
            id={"email"}
            icon={<IoMailOutline />}
            handleChange={handleChange}
            value={formDetails.email}
            label={"Email"}
            placeholder={"example@abc.com"}
          />
          <Button
            content={"Send OTP"}
            type={"submit"}
            customCss={"mt-5 rounded-lg"}
            loading={isLoading}
          />
          <div className="mt-6 flex items-center justify-between">
                  <Link to = "/auth/signin">
                     <p className="flex items-center gap-x-2 text-richblack-5"> <BiArrowBack /> Back To Login </p>
                  </Link>
                </div>
        </form>
      </div>
    </section>
  );
};

export default SendOtp;
