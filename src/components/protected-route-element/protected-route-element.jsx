import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";
import { getCookie } from "../../utils/cookie-handler";
function ProtectedRouteElement({ element, protectedFromAuthorizedUser }) {
  const location = useLocation();

  const token =
    getCookie("accessToken") || localStorage.getItem("refreshToken");

  const { from } = location.state || { from: { pathname: "/" } };

  if (protectedFromAuthorizedUser && token) {
    return <Navigate to={from} />;
  }
  if (!protectedFromAuthorizedUser && !token) {
    return <Navigate to="/login" state={{ from: location }} />;
  }
  return element;
}

ProtectedRouteElement.propTypes = {
  element: PropTypes.element.isRequired,
  protectedFromAuthorizedUser: PropTypes.bool,
};

export default ProtectedRouteElement;
