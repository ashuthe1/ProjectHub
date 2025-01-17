import React from "react";
import { GiKnifeFork } from "react-icons/gi";
import {FaLaptopCode} from "react-icons/fa"
import { Button } from "..";
import { Link } from "react-router-dom";
import "./Hero.css";

const text = "Code --> Collab --> Connect";
const Hero = () => {
  return (
    <section className="box h-[82vh] flex flex-col-reverse md:flex-row justify-between gap-8 md:gap-16 myHero">
      <div className="flex flex-col items-center md:items-start justify-center basis-1/2 gap-4 left">
        <span className="text-primary text-sm px-4 py-1 rounded-full border-2 border-primary max-w-max">
          {text}
        </span>
        <h2 className="font-bold text-3xl md:text-5xl text-center md:text-start">
          Welcome to <span className="text-primary">ProjectHub</span>
        </h2>
        <p className="text-gray-600 text-center md:text-start">
          Supercharge your open source contributions with Project Hub!
          Collabrate with other developers and build amazing projects.
        </p>
        <Link to={"/project"}>
          <Button
            content={"Explore Projects!"}
            customCss={
              "mt-4 md:mt-8 md:py-3 md:px-9 md:text-lg max-w-max rounded-full"
            }
            icon={<FaLaptopCode />}
          />
        </Link>
      </div>
      {/* <div className="basis-1/2 bg-hero bg-no-repeat bg-center rounded-xl heroBg"></div> */}
      <div className=" bg-hero bg-no-repeat heroBg"></div>
    </section>
  );
};

export default Hero;
