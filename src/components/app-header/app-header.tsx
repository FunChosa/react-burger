import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./app-header.module.css";
import cn from "classnames";
import { NavLink, useLocation } from "react-router-dom";
import { paths } from "../../utils/paths";
function AppHeader() {
  const { pathname } = useLocation();
  return (
    <header className={cn("text_type_main-default", style.header__container)}>
      <nav className={cn("mt-4 mb-4", style.navigation_container__main)}>
        <div className={cn(style.navigation_container__left)}>
          <NavLink
            to={paths.main}
            className={({ isActive }) =>
              isActive
                ? cn("pt-4 pb-4 pr-5 pl-5", style.navigation__item__active)
                : cn("pt-4 pb-4 pr-5 pl-5", style.navigation__item)
            }
          >
            <BurgerIcon type={pathname === "/" ? "primary" : "secondary"} />
            <p className={cn("text", "text_type_main-default", "ml-2")}>
              Конструктор
            </p>
          </NavLink>
          <NavLink
            to={paths.feed}
            className={({ isActive }) =>
              isActive
                ? cn("pt-4 pb-4 pr-5 pl-5", style.navigation__item__active)
                : cn("pt-4 pb-4 pr-5 pl-5", style.navigation__item)
            }
          >
            <ListIcon type={pathname === "/feed" ? "primary" : "secondary"} />
            <p className={cn("text", "text_type_main-default", "ml-2")}>
              Лента заказов
            </p>
          </NavLink>
        </div>
        <div className={cn("pr-30")}>
          <NavLink to={paths.main}>
            <Logo />
          </NavLink>
        </div>
        <NavLink
          to={paths.profile}
          className={({ isActive }) =>
            isActive
              ? cn("pt-4 pb-4 pr-5 pl-5", style.navigation__item__active)
              : cn("pt-4 pb-4 pr-5 pl-5", style.navigation__item)
          }
        >
          <ProfileIcon
            type={pathname === "/profile" ? "primary" : "secondary"}
          />
          <p className={cn("text", "text_type_main-default", "ml-2")}>
            Личный кабинет
          </p>
        </NavLink>
      </nav>
    </header>
  );
}

export default AppHeader;
