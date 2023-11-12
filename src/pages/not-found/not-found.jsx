import style from "./not-found.module.css";
import cn from "classnames";
import { NavLink } from "react-router-dom";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
export default function NotFound() {
  return (
    <div className={cn(style.container, "mt-30")}>
      <p className={cn(style.text, "text text_type_main-large")}>
        404 Not Found :/
      </p>
      <p
        className={cn("text text_type_main-medium text_color_inactive", "mt-5")}
      >
        Страница не найдена. А может её никогда и не было?..
      </p>
      <NavLink to="/" className={cn("mt-20", "text text_type_main-medium")}>
        <Button htmlType="button" type="primary" size="large">
          Вернуться на главную
        </Button>
      </NavLink>
    </div>
  );
}
