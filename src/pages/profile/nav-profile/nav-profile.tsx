import style from "./nav-profile.module.css";
import cn from "classnames";
import { NavLink, useLocation } from "react-router-dom";
import { logoutUserAction } from "../../../services/actions/user-actions/logout-user-actions";
import { paths } from "../../../utils/paths";
import { useAppDispatch } from "../../../hooks/useSelector-useDispatch";

export default function NavProfile() {
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();

  const logoutRequest = () => {
    dispatch(logoutUserAction() as any);
  };

  return (
    <div className={cn(style.navigation, "mt-20")}>
      <NavLink
        to={paths.profile}
        className={({ isActive }) =>
          isActive ? cn("mb-6", style.active) : cn("mb-6", style.link)
        }
      >
        <p
          className={cn(
            `text text_type_main-medium text_color_${
              pathname === "/profile" ? "primary" : "inactive"
            }`
          )}
        >
          Профиль
        </p>
      </NavLink>
      <NavLink
        to={paths.profileOrders}
        className={({ isActive }) =>
          isActive ? cn("mb-6", style.active) : cn("mb-6", style.link)
        }
      >
        <p
          className={cn(
            `text text_type_main-medium text_color_${
              pathname === "/profile/orders" ? "primary" : "inactive"
            }`
          )}
        >
          История заказов
        </p>
      </NavLink>
      <NavLink
        to={paths.login}
        className={({ isActive }) =>
          isActive ? cn("mb-6", style.active) : cn("mb-6", style.link)
        }
      >
        <p
          className={cn(
            `text text_type_main-medium text_color_${
              pathname === "/exit" ? "primary" : "inactive"
            }`
          )}
          onClick={logoutRequest}
        >
          Выход
        </p>
      </NavLink>
      <p
        className={cn(
          "text text_type_main-default text_color_inactive",
          "mt-30"
        )}
      >
        В этом разделе вы можете <br />
        изменить свои персональные данные
      </p>
    </div>
  );
}
