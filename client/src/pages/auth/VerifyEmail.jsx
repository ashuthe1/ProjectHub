import { useEffect, useState } from "react";
import OtpInput from "react-otp-input";
import { Link } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { RxCountdownTimer } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
// import { sendOtp, signUp } from "../services/operations/authAPI";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

function VerifyEmail() {

  const [otp, setOtp] = useState("");
  const { signupData, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // useEffect(() => {                // Only allow access of this route when user has filled the signup form
  //    if(!signupData) navigate("/signup");
  // }, []);

  const handleVerifyAndSignup = (e) => {
    e.preventDefault();
    const { accountType,  firstName, lastName, email, password, confirmPassword, } = signupData;

    // dispatch(
    //   signUp( accountType,  firstName, lastName, email, password, confirmPassword,  otp, navigate )
    //   )
  };


  return (

    <div className="min-h-[calc(100vh-3.5rem)] grid place-items-center verifyEmail">
      { loading ? ( <div className="spinner"></div> ) : (
       
            <div className="max-w-[500px] p-4 lg:p-8">

              <h1 className="text-richblack-5 font-semibold text-[1.875rem] leading-[2.375rem]"> Verify Email </h1>
              <p className="text-[1.125rem] leading-[1.625rem] my-4 text-richblack-100"> A verification code has been sent to your Email. Enter the OTP below</p>
              {/* <p> Enter the OTP below </p> */}
    
              <form onSubmit={handleVerifyAndSignup}>

                <OtpInput value={otp} onChange={setOtp} numInputs={6}                      // this otp box conatiner is copied from internet   -4px 7px 18px 11px rgba(0,0,0,0.75), inset -5px 14px 28px 1px rgba(0,0,0,0.75)
                  renderInput = {(props) => (
                    <input {...props}  placeholder="-"  style={{boxShadow: "inset -5px 14px 28px 1px rgba(0,0,0,0.75)",}}  className="w-[48px] lg:w-[60px] border-0 bg-richblack-800 rounded-[0.5rem] text-richblack-5 aspect-square text-center focus:border-0 focus:outline-2 focus:outline-gold-100"  />
                        )}
                  containerStyle = {{ justifyContent: "space-between", gap: "0 6px", }} 
                />
                <button type="submit" className="w-full bg-yellow-50 py-[12px] px-[12px] rounded-[8px] mt-6 font-medium text-richblack-900 verifyEmailButton"> Verify OTP </button>
                
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