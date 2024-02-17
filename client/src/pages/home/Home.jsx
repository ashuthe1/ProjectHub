import React from "react";
import { Hero, HomeCategories, Subscribe } from "../../components";
import { useGetProjectsQuery, useGetFeaturedProjectsQuery } from "../../features/project/projectApiSlice";
import { useGetBlogsQuery } from "../../features/blog/blogApiSlice";
import useAuth from "../../hooks/useAuth";

const Home = () => {
  const user = useAuth();
  const projects = useGetFeaturedProjectsQuery();
  const blogs = useGetBlogsQuery();

  return (
    <>
      <Hero />
      <HomeCategories
        title={"project"}
        data={projects?.data}
        isLoading={projects?.isLoading}
      />
      {!user?.roles?.some((role) => role === "ProUser" || role === "Admin") && (
        <Subscribe />
      )}
      <HomeCategories
        title={"blog"}
        data={blogs?.data}
        isLoading={true}
      />
    </>
  );
};

export default Home;
