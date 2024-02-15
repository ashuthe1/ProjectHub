import { Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  AddBlog,
  AddProject,
  Blogs,
  Contact,
  DashboardBlogs,
  DashboardProjects,
  EditBlog,
  EditProject,
  Error,
  Home,
  MyBlogs,
  MyProjects,
  Profile,
  Project,
  SavedProjects,
  SingleBlog,
  SingleProject,
  Users,
  SignIn,
  SignUp,
  ForgotPassword,
  VerifyEmail,
  CheckoutSuccess,
  CheckoutFailure,
} from "./pages";
import { ScrollToTop, PageLoading } from "./components";
import { RootLayout, DashboardLayout } from "./layouts";
import RequireAuth from "./features/auth/RequireAuth";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ROLES from "./common/roles";
import PersistLogin from "./features/auth/PersistLogin";
import useTitle from "./hooks/useTitle";

function App() {
  useTitle("ProjectHub - Home");

  return (
    <Router>
      <ScrollToTop />
      <ToastContainer
        autoClose={5000}
        closeOnClick
        pauseOnFocusLoss={false}
        pauseOnHover={false}
      />
      <Suspense fallback={<PageLoading />}>
        <Routes>
          <Route path="/auth">
            <Route
              path="signin"
              element={<SignIn />}
            />
            <Route
              path="signup"
              element={<SignUp />}
            />
            <Route
              path="forgotPassword"
              element={<ForgotPassword />}
            />
            <Route
              path="verifyEmail"
              element={<VerifyEmail />}
            />
          </Route>

          <Route element={<PersistLogin />}>
            {/* Dashboard */}
            <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
              <Route
                path="/dashboard"
                element={<DashboardLayout />}
              >
                <Route
                  path="users"
                  element={<Users />}
                />
                <Route
                  path="projects"
                  element={<DashboardProjects />}
                />
                <Route
                  path="blogs"
                  element={<DashboardBlogs />}
                />
              </Route>
            </Route>

            <Route
              path="/"
              element={<RootLayout />}
            >
              <Route
                index
                element={<Home />}
              />
              <Route path="project">
                <Route
                  index
                  element={<Project />}
                />
                <Route
                  path=":id"
                  element={<SingleProject />}
                />
                <Route
                  path="saved"
                  element={<SavedProjects />}
                />

                <Route
                  element={
                    <RequireAuth allowedRoles={[ROLES.BasicUser, ROLES.ProUser, ROLES.Admin]} />
                  }
                >
                  <Route
                    path="add"
                    element={<AddProject />}
                  />
                  <Route
                    path="my-projects"
                    element={<MyProjects />}
                  />
                  <Route
                    path="edit/:id"
                    element={<EditProject />}
                  />
                </Route>
              </Route>
              <Route
                path="contact"
                element={<Contact />}
              />
              <Route path="blog">
                <Route
                  index
                  element={<Blogs />}
                />
                <Route
                  path=":id"
                  element={<SingleBlog />}
                />
                <Route
                  element={
                    <RequireAuth allowedRoles={[ROLES.ProUser, ROLES.Admin]} />
                  }
                >
                  <Route
                    path="add"
                    element={<AddBlog />}
                  />
                  <Route
                    path="my-blogs"
                    element={<MyBlogs />}
                  />
                  <Route
                    path="edit/:id"
                    element={<EditBlog />}
                  />
                </Route>
              </Route>
              <Route
                element={
                  <RequireAuth
                    allowedRoles={[ROLES.BasicUser, ROLES.ProUser, ROLES.Admin]}
                  />
                }
              >
                <Route
                  path="profile"
                  element={<Profile />}
                />
                <Route
                  path="payment-success"
                  element={<CheckoutSuccess />}
                />
                <Route
                  path="payment-failed"
                  element={<CheckoutFailure />}
                />
              </Route>
              <Route
                path="/*"
                element={<Error />}
              />
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
