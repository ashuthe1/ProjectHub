import React from "react";
import { AllCards, ComponentLoading } from "../../components";
import { useGetProjectsQuery } from "../../features/project/projectApiSlice";
import useAuth from "../../hooks/useAuth";

const index = () => {
  const { data, isLoading } = useGetProjectsQuery();
  const user = useAuth();

  const updatedData = data?.filter((obj) =>
    user?.favorites?.includes(obj._id.toString())
  );

  return (
    <>
      {isLoading ? (
        <ComponentLoading />
      ) : (
        <AllCards
          mainTitle={"Your Faviourate Projects!"}
          tagline={
            "Welcome to your personal space. Here you can find all your saved projects."
          }
          type={"project"}
          data={updatedData}
        />
      )}
    </>
  );
};

export default index;
