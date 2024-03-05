import React, { useState } from "react";
import { Button, Input } from "../../components";
import { BiLockAlt } from "react-icons/bi";
import { IoMailOutline } from "react-icons/io5";
import { AiOutlineUser } from "react-icons/ai";
import { profileBg } from "../../assets";
import { CircularProgress, Avatar as MuiAvatar } from "@mui/material";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useUpdateUserMutation } from "../../features/user/userApiSlice";
import useAuth from "../../hooks/useAuth";
import useTitle from "../../hooks/useTitle";
import { DiGithubBadge } from "react-icons/di";
import { FaLinkedin } from "react-icons/fa";
import { GoOrganization, GoPeople, GoPaperAirplane, GoPersonAdd, GoRepo, GoLink, GoLocation, GoMail, GoBrowser, GoMention, GoMoon, GoSun, GoStar} from 'react-icons/go';
import {
  useFollowUserMutation,
} from "../../features/user/userApiSlice";
import './ContributorProfile.css';

const ContributorProfile = (userProfile) => {
    useTitle("ProjectHub - Contributors");
    const [followUser] = useFollowUserMutation();

    async function handleFollow() {
      console.log("Inside follow function");
      followUser(userProfile.data._id);
      console.log("Followed");
    }
    async function handleSendMessage() {
      console.log("Message Sent");
    }
    // console.log(userProfile.data);
    return (
        <>
      <span className={`flex justify-center items-center min-h-[60vh] sm:my-0 mx-[1rem] mt-[5rem] text-[#000000] dark:text-[#ffffff]`}>
        {userProfile.data && (
          <div className='card-section flex justify-center items-center gap-[20px]'>
            <div className='user-info-container relative bg-[#ffffff] dark:bg-slate-700 text-[#000000] dark:text-[#ffffff] border-[1px] border-[#d0d7de] rounded-tr-[10px] rounded-br-[10px] rounded-bl-[10px] p-[30px] max-w-[550px] flex flex-col justify-start items-start gap-[15px]'>
              {/* <span className='user-type absolute top-[-38px] left-[-1px] bg-[#ffffff] dark:bg-slate-700 px-[15px] py-[5px] border-[1px] border-[#d0d7de] border-b-0 rounded-tl-[10px] rounded-tr-[10px] font-semibold text-[18px]'>{userProfile.data.type}</span> */}
              <div className='user-info flex justify-start items-center gap-[15px]'>
                <img className='w-[100px] h-[100px] rounded-full border-[5px] border-[#dddede] dark:border-slate-400' src={userProfile.data.profilePicture} alt="avatar profile" />
                <div className='user-name'>
                  <h2 className='user-h2-tag text-[24px] textWhite'>{userProfile.data.name}</h2>
                  <div className='user-additional chatBoxIcon'>
                    {/* <a href={userProfile.data.html_url} target='__blank' className='user-login user-p-tag text-[18px] flex justify-center items-center gap-[2px]'>message <GoPaperAirplane className='user-browser ml-[7px]' /></a> */}
                    <button onClick={handleSendMessage} className='user-login user-p-tag text-[18px] flex items-center gap-[2px]'>
                      message <GoPaperAirplane className='user-browser ml-[7px]' />
                    </button>
                  </div>
                </div>
              </div>
              <p className='user-p-tag text-[18px]'>{userProfile.data.about !== null ? (<p>{userProfile.data.about}</p>) : 'Bio not mentioned'}</p>
                <div className='user-additional-container flex flex-col gap-[5px]'>
                <div className="user-additional flex justify-start items-center gap-[5px]">
                  <DiGithubBadge  className='githubLogo' />
                  <p>{userProfile.data.githubProfile? (<p>{userProfile.data.githubProfile}</p>) : ('Not Mentioned')}</p>
                  {/* <p>{userProfile.data.githubProfile}</p> */}
                </div>
                <div className="user-additional flex justify-start items-center gap-[5px]">
                  <GoMail />
                  <p>{userProfile.data.email !== null ? (<p>{userProfile.data.email}</p>) : ('Not Mentioned')}</p>
                </div>

                <div className="spaceBanao">
                    <div className='user-cell flex justify-start items-center gap-[15px] bg-[#ffffff] dark:bg-slate-700 p-[10px] rounded-[10px] border-[1px] border-[d0d7de] w-[200px] text-[#000000] dark:text-[#ffffff] group firstBox'>
                        <div className='cell-icons bg-gradient-to-b from-[#9d62f3] to-[#644ad1] group-hover:bg-gradient-to-t text-[#ffffff] h-[40px] w-[40px] rounded-full flex justify-center items-center my-0 mx-[10px] '>
                            <GoRepo />
                        </div>
                        <div className='user-cell-titles'>
                            <h3 className='text-[24px] textWhite'>{userProfile.data.projectsCount}</h3>
                            <p className='user-p-tag text-[18px]'>Projects</p>
                        </div>
                    </div>

                    {/* Followers */}
                    <div className='user-cell flex justify-start items-center gap-[15px] bg-[#ffffff] dark:bg-slate-700 p-[10px] rounded-[10px] border-[1px] border-[d0d7de] w-[200px] text-[#000000] dark:text-[#ffffff] group'>
                        <button onClick={handleFollow}> 
                          <div className='cell-icons bg-gradient-to-b from-[#9d62f3] to-[#644ad1] group-hover:bg-gradient-to-t text-[#ffffff] h-[40px] w-[40px] rounded-full flex justify-center items-center my-0 mx-[10px] '>
                            <GoPersonAdd />
                          </div>
                        </button>
                        <div className='user-cell-titles'>
                            <h3 className='text-[24px] textWhite'>{userProfile.data.followersData.count}</h3>
                            <p className='user-p-tag text-[18px]'>Followers</p>
                        </div>
                    </div>
                    
                </div>
              </div>
            </div>
          </div>
        )}
      </span >
    </>
    );
};

export default ContributorProfile;
