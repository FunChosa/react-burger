import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./app-header.module.css";
import cn from "classnames";
import NavigationItem from "./navigation-item";
function AppHeader() {
  return (
    <header className={cn("text_type_main-default", style.header__container)}>
      <nav className={cn("mt-4 mb-4", style.navigation_container__main)}>
        <div className={cn(style.navigation_container__left)}>
          <NavigationItem
            icon={<BurgerIcon type="primary" />}
            text="Конструктор"
            inactiveTextColor={false}
          />
          <NavigationItem
            icon={<ListIcon type="secondary" />}
            text="Лента заказов"
            inactiveTextColor={true}
          />
        </div>
        <div className={cn("pr-30")}>
          <Logo />
        </div>
        <NavigationItem
          icon={<ProfileIcon type="secondary" />}
          text="Личный кабинет"
          inactiveTextColor={true}
        />
      </nav>
    </header>
  );
}

export default AppHeader;
