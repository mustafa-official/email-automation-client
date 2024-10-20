import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading)
    return (
      <div className="h-[80vh] flex justify-center items-center">
        <span className="loading loading-spinner loading-md"></span>
      </div>
    );
  if (user) return children;
  return <Navigate to="/" replace="true" />;
};

PrivateRoute.propTypes = {
  children: PropTypes.node,
};
export default PrivateRoute;
