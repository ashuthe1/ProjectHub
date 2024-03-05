import React from 'react';
import {ComponentLoading, ContributorProfile} from "../../components";
import { useDispatch } from "react-redux";
import { setUsers } from "../../features/user/userSlice";
import {
  useGetUsersQuery,
  useDisableUserMutation,
} from "../../features/user/userApiSlice";
import './Contributors.css';

const Contributors = () => {
  const { data, isLoading } = useGetUsersQuery();
  return (
    
    isLoading ? (
      <div className="loading">
        <ComponentLoading />
      </div>
    ) :
    <div className="user-list">
      {data?.map((item, idx) => (
        <ContributorProfile key={idx} data={item} />
      ))}
    </div>
  );
};

export default Contributors;