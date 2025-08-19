import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const storedUser = sessionStorage.getItem("loggedIn");

  // if user is already logged in, block access to login page
  if (storedUser) {
    const user = JSON.parse(storedUser);

    // check if expired
    if (user.expiry && Date.now() < user.expiry) {
      return <Navigate to="/dashboard" />;  // redirect to protected page
    } else {
      // expired → clear session
      sessionStorage.removeItem("loggedIn");
    }
  }

  return children;
};

export default PublicRoute;
