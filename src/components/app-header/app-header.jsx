import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./app-header.module.css";
import cn from "classnames";

function AppHeader() {
  const createNavigationItem = ({ icon, text, inactiveTextColor }) => {
    return (
      <div className={cn("pt-4 pb-4 pr-5 pl-5", style.navigation__item)}>
        {icon}
        <p className={cn(inactiveTextColor && "text_color_inactive", "ml-2")}>
          {text}
        </p>
      </div>
    );
  }
  return (
    <header className={cn("text_type_main-default", style.header__container)}> { /* главный контейнер */}
      <nav className={cn("mt-4 mb-4", style.navigation_container__main)}> { /* контейнер с навигацией */}
        <div className={cn(style.navigation_container__left)}> { /* отдельный контейнер с навигацией для двух левых элементов хедера */}
          {createNavigationItem({ icon: <BurgerIcon type="primary" />, text: "Конструктор", inactiveTextColor: false })} {/* Конструктор */}
          {createNavigationItem({ icon: <ListIcon type="secondary" />, text: "Лента заказов", inactiveTextColor: true })} {/* Лента заказов */}
        </div>
        <div className={cn("pr-30")}> { /* отдельный контейнер с логотипом */}
          <Logo />
        </div> 
        {createNavigationItem({ icon: <ProfileIcon type="secondary" />, text: "Личный кабинет", inactiveTextColor: true })} {/* Личный кабинет */}
      </nav>
    </header>
  );
}

export default AppHeader;
