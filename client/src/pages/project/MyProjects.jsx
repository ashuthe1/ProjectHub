import React from "react";
import { AllCards, ComponentLoading } from "../../components";
import { useGetProjectsQuery } from "../../features/project/projectApiSlice";
import useAuth from "../../hooks/useAuth";
import useTitle from "../../hooks/useTitle";

const index = () => {
  const { data, isLoading } = useGetProjectsQuery();
  const user = useAuth();
  useTitle("ProjectHub - My Projects");

  const updatedData = data?.filter((obj) => obj.author._id === user?.userId);

  return (
    <>
      {isLoading ? (
        <ComponentLoading />
      ) : (
        <AllCards
          mainTitle={"Your Original Creations"}
          tagline={
            "Welcome to your dedicated space where your imagination takes the lead."
          }
          type={"project"}
          data={updatedData}
        />
      )}
    </>
  );
};

export default index;
