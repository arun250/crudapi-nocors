import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const storedUser = sessionStorage.getItem("loggedIn");
  if (!storedUser) return <Navigate to="/" />;

  const user = JSON.parse(storedUser);

  // check expiry
  if (!user.expiry || Date.now() > user.expiry) {
    sessionStorage.removeItem("loggedIn");
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
