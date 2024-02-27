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
import { GoOrganization, GoPeople, GoPersonAdd, GoRepo, GoLink, GoLocation, GoMail, GoBrowser, GoMention, GoMoon, GoSun, GoStar} from 'react-icons/go';
import './ContributorProfile.css';

const userProfile = {
    "login": "ashuthe1",
    "id": 86846633,
    "node_id": "MDQ6VXNlcjg2ODQ2NjMz",
    "avatar_url": "https://avatars.githubusercontent.com/u/86846633?v=4",
    "gravatar_id": "",
    "url": "https://api.github.com/users/ashuthe1",
    "html_url": "https://github.com/ashuthe1",
    "followers_url": "https://api.github.com/users/ashuthe1/followers",
    "following_url": "https://api.github.com/users/ashuthe1/following{/other_user}",
    "gists_url": "https://api.github.com/users/ashuthe1/gists{/gist_id}",
    "starred_url": "https://api.github.com/users/ashuthe1/starred{/owner}{/repo}",
    "subscriptions_url": "https://api.github.com/users/ashuthe1/subscriptions",
    "organizations_url": "https://api.github.com/users/ashuthe1/orgs",
    "repos_url": "https://api.github.com/users/ashuthe1/repos",
    "events_url": "https://api.github.com/users/ashuthe1/events{/privacy}",
    "received_events_url": "https://api.github.com/users/ashuthe1/received_events",
    "type": "User",
    "site_admin": false,
    "name": "Ashutosh Gautam",
    "company": null,
    "blog": "ashutoshgautam.dev",
    "location": "Bengaluru",
    "email": null,
    "hireable": true,
    "bio": "Upcoming SWE Intern @Cisco🔸5🌟CodeChef🔸Expert @CodeForces 🔸Ex Backend Developer @Rablo🔸ICPC Regionalist'23🔸Problem Setter at iMochaWorks",
    "twitter_username": "ashuthe1x",
    "public_repos": 74,
    "public_gists": 0,
    "followers": 30,
    "following": 149,
    "created_at": "2021-07-02T16:14:21Z",
    "updated_at": "2024-02-25T12:59:47Z"
  }
const ContributorProfile = ({ user }) => {
    useTitle("ProjectHub - Profile");

    return (
        <>
      <section className={`flex justify-center items-center min-h-[80vh] sm:my-0 mx-[1rem] mt-[5rem] text-[#000000] dark:text-[#ffffff]`}>
        {userProfile && (
          <div className='card-section flex justify-center items-center gap-[20px]'>
            <div className='user-info-container relative bg-[#ffffff] dark:bg-slate-700 text-[#000000] dark:text-[#ffffff] border-[1px] border-[#d0d7de] rounded-tr-[10px] rounded-br-[10px] rounded-bl-[10px] p-[30px] max-w-[550px] flex flex-col justify-start items-start gap-[15px]'>
              {/* <span className='user-type absolute top-[-38px] left-[-1px] bg-[#ffffff] dark:bg-slate-700 px-[15px] py-[5px] border-[1px] border-[#d0d7de] border-b-0 rounded-tl-[10px] rounded-tr-[10px] font-semibold text-[18px]'>{userProfile.type}</span> */}
              <div className='user-info flex justify-start items-center gap-[15px]'>
                <img className='w-[100px] h-[100px] rounded-full border-[5px] border-[#dddede] dark:border-slate-400' src={userProfile.avatar_url} alt="avatar profile" />
                <div className='user-name'>
                  <h2 className='user-h2-tag text-[24px] textWhite'>{userProfile.name}</h2>
                  <div className='user-additional'>
                    <a href={userProfile.html_url} target='__blank' className='user-login user-p-tag text-[18px] flex justify-center items-center gap-[2px]'><GoMention />{userProfile.login} <GoBrowser className='user-browser ml-[7px]' /></a>
                  </div>
                </div>
              </div>
              <p className='user-p-tag text-[18px]'>{userProfile.bio !== null ? (<p>{userProfile.bio}</p>) : 'Bio not mentioned'}</p>
              <div className='user-additional-container flex flex-col gap-[5px]'>
                <div className="user-additional flex justify-start items-center gap-[5px]">
                  <GoLocation />
                  <p>{userProfile.location !== null ? (<p>{userProfile.location}</p>) : 'Not Mentioned'}</p>
                </div>
                <div className="user-additional flex justify-start items-center gap-[5px]">
                  <GoLink />
                  <p>{userProfile.blog !== '' ? (<a href={userProfile.blog} target='__blank'>{userProfile.blog.replace(/https?:\/\//, '')}</a>) : ('Not Mentioned')}</p>
                </div>
                <div className="user-additional flex justify-start items-center gap-[5px]">
                  <GoMail />
                  <p>{userProfile.email !== null ? (<p>{userProfile.email}</p>) : ('Not Mentioned')}</p>
                </div>

                <div className="spaceBanao">
                    <div className='user-cell flex justify-start items-center gap-[15px] bg-[#ffffff] dark:bg-slate-700 p-[10px] rounded-[10px] border-[1px] border-[d0d7de] w-[200px] text-[#000000] dark:text-[#ffffff] group firstBox'>
                        <div className='cell-icons bg-gradient-to-b from-[#9d62f3] to-[#644ad1] group-hover:bg-gradient-to-t text-[#ffffff] h-[40px] w-[40px] rounded-full flex justify-center items-center my-0 mx-[10px] '>
                            <GoRepo />
                        </div>
                        <div className='user-cell-titles'>
                            <h3 className='text-[24px] textWhite'>{userProfile.public_repos}</h3>
                            <p className='user-p-tag text-[18px]'>Projects</p>
                        </div>
                    </div>

                    {/* Followers */}
                    <div className='user-cell flex justify-start items-center gap-[15px] bg-[#ffffff] dark:bg-slate-700 p-[10px] rounded-[10px] border-[1px] border-[d0d7de] w-[200px] text-[#000000] dark:text-[#ffffff] group'>
                        <div className='cell-icons bg-gradient-to-b from-[#9d62f3] to-[#644ad1] group-hover:bg-gradient-to-t text-[#ffffff] h-[40px] w-[40px] rounded-full flex justify-center items-center my-0 mx-[10px] '>
                            <GoPeople />
                        </div>
                        <div className='user-cell-titles'>
                            <h3 className='text-[24px] textWhite'>{userProfile.followers}</h3>
                            <p className='user-p-tag text-[18px]'>Followers</p>
                        </div>
                    </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </section >
    </>
    );
};

export default ContributorProfile;
