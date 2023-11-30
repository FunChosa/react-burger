import style from "./preloader.module.css";
import cn from "classnames";
function Preloader() {
  return (
    <div
      className={cn(
        style.container,
        "mt-30",
        "text text_type_main-large text_color_inactive"
      )}
    >
      <p
        className={cn(
          style.text,
          "text text_type_main-large text_color_inactive"
        )}
      >
        Загружаем данные...
      </p>
    </div>
  );
}

export default Preloader;
