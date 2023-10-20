import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./app-header.module.css";
import cn from "classnames";
import CreateNavigationItem from "./create-navigation-item";
function AppHeader() {
  return (
    <header className={cn("text_type_main-default", style.header__container)}>
      <nav className={cn("mt-4 mb-4", style.navigation_container__main)}>
        <div className={cn(style.navigation_container__left)}>
          <CreateNavigationItem
            icon={<BurgerIcon type="primary" />}
            text="Конструктор"
            inactiveTextColor={true}
          />
          <CreateNavigationItem
            icon={<ListIcon type="secondary" />}
            text="Лента заказов"
            inactiveTextColor={true}
          />
        </div>
        <div className={cn("pr-30")}>
          <Logo />
        </div>
        <CreateNavigationItem
          icon={<ProfileIcon type="secondary" />}
          text="Личный кабинет"
          inactiveTextColor={true}
        />
      </nav>
    </header>
  );
}

export default AppHeader;
