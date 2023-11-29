import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";
import { getCookie } from "../../utils/cookie-handler";
import { paths } from "../../utils/paths";
import { useEffect, useState } from "react";
import { getUserInfoRequest } from "../../services/actions/user-actions";
import { useDispatch } from "react-redux";
import Preloader from "../preloader/preloader";
function ProtectedRouteElement({ element, protectedFromAuthorizedUser }) {
  const location = useLocation();
  const dispatch = useDispatch();
  const [isUserLoaded, setIsUserLoaded] = useState(false);
  useEffect(() => {
    dispatch(getUserInfoRequest()).then(() => {
      setIsUserLoaded(true);
    });
  }, [dispatch]);

  const token =
    getCookie("accessToken") || localStorage.getItem("refreshToken");

  const { from } = location.state || { from: { pathname: "/" } };

  if (!isUserLoaded) {
    return <Preloader />;
  }
  if (protectedFromAuthorizedUser && token) {
    // если пользователь авторизован и маршрут только для неавторизованных
    return <Navigate to={from} />;
  }
  if (!protectedFromAuthorizedUser && !token) {
    // если пользователь не авторизован и маршрут только для авторизованных
    return <Navigate to={paths.login} state={{ from: location }} />;
  }

  return element;
}

ProtectedRouteElement.propTypes = {
  element: PropTypes.element.isRequired,
  protectedFromAuthorizedUser: PropTypes.bool,
};

export default ProtectedRouteElement;
