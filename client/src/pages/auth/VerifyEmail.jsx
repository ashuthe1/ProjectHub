import { useEffect, useState } from "react";
import OtpInput from "react-otp-input";
import { Link } from "react-router-dom";
import { Button, Input, Logo } from "../../components";
import { BiArrowBack } from "react-icons/bi";
import { RxCountdownTimer } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import {setOtp, selectCurrentEmail} from "../../features/auth/authSlice";
import { toast } from "react-toastify";
import { useVerifyOtpMutation } from "../../features/auth/authApiSlice";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

function VerifyEmail() {

  const [inputBoxOtp, setInputBoxOtp] = useState("");
  const [verifyOtp, { isLoading }] = useVerifyOtpMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const email = useSelector(selectCurrentEmail);

  const handleSubmit = async (e) => {
    console.log("email", email);
    console.log("inputBoxOtp", inputBoxOtp);

    e.preventDefault();
    e.preventDefault();
    dispatch(setOtp(inputBoxOtp));
    try {
      const verificationData = {
        otp: inputBoxOtp,
        email: email,
      };
      const userData = await toast.promise(
        verifyOtp(verificationData).unwrap(),
        {
          pending: "Please wait...",
          success: "OTP Verified Successfully",
          error: "OTP Verification Failed. Please try again.",
        }
      );
      console.log()
      localStorage.setItem("persist", true);
      // setFormDetails({ otp: ""});
      navigate("/auth/updatePassword");
    } catch (error) {
      toast.error(error.data);
      console.error(error);
    }
  };

  return (

    <div className="min-h-[calc(100vh-3.5rem)] grid place-items-center verifyEmail">
      {(
       
            <div className="max-w-[500px] p-4 lg:p-8">

              <h1 className="text-richblack-5 font-semibold text-[1.875rem] leading-[2.375rem]"> Verify Email </h1>
              <p className="text-[1.125rem] leading-[1.625rem] my-4 text-richblack-100"> A verification code has been sent to your Email. Enter the OTP below</p>
              {/* <p> Enter the OTP below </p> */}
    
              <form onSubmit={handleSubmit}>

                <OtpInput value={inputBoxOtp} onChange={setInputBoxOtp} numInputs={6}                      // this otp box conatiner is copied from internet   -4px 7px 18px 11px rgba(0,0,0,0.75), inset -5px 14px 28px 1px rgba(0,0,0,0.75)
                  renderInput = {(props) => (
                    <input {...props}  placeholder="-"  style={{boxShadow: "inset -5px 14px 28px 1px rgba(0,0,0,0.75)",}}  className="w-[48px] lg:w-[60px] border-0 bg-richblack-800 rounded-[0.5rem] text-richblack-5 aspect-square text-center focus:border-0 focus:outline-2 focus:outline-gold-100"  />
                        )}
                  containerStyle = {{ justifyContent: "space-between", gap: "0 6px", }} 
                />

                <Button
                  content={"Verify OTP"}
                  type={"submit"}
                  customCss={"mt-5 rounded-lg"}
                  loading={isLoading}
                />
                
              </form>

              <div className="mt-6 flex items-center justify-between">
                <Link to="/auth/signin">
                  <p className="text-richblack-5 flex items-center gap-x-2"> <BiArrowBack /> Back To LogIn </p>
                </Link>
                <button className="flex items-center text-blue-100 gap-x-2 retryButton"> <RxCountdownTimer /> Resend it </button>          
              </div>

            </div>
           )
       }
    </div>
)}


export default VerifyEmail;