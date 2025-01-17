import React, { useState, useEffect } from "react"; // Ensure useState is imported
import { useDispatch } from "react-redux";
import { setCredentials } from "../../features/auth/authSlice";
import { Logo, Button, Menu, Avatar } from "..";
import { Link, NavLink } from "react-router-dom";
import { FiLogIn, FiMenu } from "react-icons/fi";
import useAuth from "../../hooks/useAuth";

const Header = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const user = useAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    // Restore the JWT from cookies if present
    const cookieString = document.cookie.split('; ').find(row => row.startsWith('jwt='));
    if (cookieString) {
      const jwt = cookieString.split('=')[1];
      dispatch(setCredentials({ accessToken: jwt }));
      // Also store in localStorage for persistence
      localStorage.setItem('persist', true);
    }

    // Capture the query parameters from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const accessToken = urlParams.get('accessToken');

    // If an access token is found in the URL, save it to cookies and localStorage
    if (accessToken) {
      dispatch(setCredentials({ accessToken }));
      localStorage.setItem('persist', true); // Save to localStorage
      document.cookie = `jwt=${accessToken};path=/;secure;SameSite=Lax`; // Save to cookie

      // Clear the URL of the query parameter after capturing it
      window.history.replaceState({}, document.title, "/");
    }
  }, [dispatch]);

  return (
    <header className="shadow-sm sticky top-0 backdrop-blur-sm bg-[#fffefc80] z-20">
      <div className="box flex justify-between items-center py-3">
        <Logo />
        {/* Desktop navbar */}
        <nav className="hidden md:block">
          {/* Navbar links */}
          <ul className="flex gap-10">
            <li>
              <NavLink
                to={"/"}
                className="relative w-fit block after:block after:content-[''] after:absolute after:h-[2px] after:bg-primary after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-center font-semibold text-gray-600"
              >
                Home
              </NavLink>
            </li>
            {user && user?.isAdmin && (
              <li>
                <NavLink
                  to={"/dashboard/users"}
                  className="relative w-fit block after:block after:content-[''] after:absolute after:h-[2px] after:bg-primary after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-center font-semibold text-gray-600"
                >
                  Dashboard
                </NavLink>
              </li>
            )}
            <li>
              <NavLink
                to={"/project"}
                className="relative w-fit block after:block after:content-[''] after:absolute after:h-[2px] after:bg-primary after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-center font-semibold text-gray-600"
              >
                Projects
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/project/add"}
                className="relative w-fit block after:block after:content-[''] after:absolute after:h-[2px] after:bg-primary after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-center font-semibold text-gray-600"
              >
                Add Project
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/contributors"}
                className="relative w-fit block after:block after:content-[''] after:absolute after:h-[2px] after:bg-primary after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-center font-semibold text-gray-600"
              >
                Contributors
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/blog"}
                className="relative w-fit block after:block after:content-[''] after:absolute after:h-[2px] after:bg-primary after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-center font-semibold text-gray-600"
              >
                Blogs
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/contact"}
                className="relative w-fit block after:block after:content-[''] after:absolute after:h-[2px] after:bg-primary after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-center font-semibold text-gray-600"
              >
                Contact
              </NavLink>
            </li>
          </ul>
        </nav>
        {/* Sign in button */}
        {user ? (
          <Avatar />
        ) : (
          <Link
            to={"/auth/signin"}
            className="hidden md:block"
          >
            <Button
              content={"Sign In"}
              customCss={"max-w-max rounded-full"}
              icon={<FiLogIn />}
            />
          </Link>
        )}
        {/* Menu button */}
        <FiMenu
          className="block md:hidden text-xl cursor-pointer"
          onClick={() => setIsCollapsed(!isCollapsed)}
        />

        {/* Mobile navbar */}
        <Menu
          setIsCollapsed={setIsCollapsed}
          isCollapsed={isCollapsed}
          user={user}
        />
      </div>
    </header>
  );
};

export default Header;
