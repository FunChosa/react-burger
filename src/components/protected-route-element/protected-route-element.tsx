import { Navigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { getCookie } from "../../utils/cookie-handler";
import { paths } from "../../utils/paths";
import { useEffect, useState } from "react";
import { getUserInfoAction } from "../../services/actions/user-actions/get-user-info-actions";
import Preloader from "../preloader/preloader";
import { useAppDispatch } from "../../hooks/useSelector-useDispatch";
function ProtectedRouteElement({
  element,
  protectedFromAuthorizedUser,
}: {
  element: JSX.Element;
  protectedFromAuthorizedUser?: boolean;
}) {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const [isUserLoaded, setIsUserLoaded] = useState(false);
  useEffect(() => {
    dispatch(getUserInfoAction() as any).then(() => {
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

export default ProtectedRouteElement;
