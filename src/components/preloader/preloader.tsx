import style from "./preloader.module.css";
import cn from "classnames";

type TPreloader = {
  text?: string;
};
export default function Preloader(props: TPreloader) {
  const text = props.text || "Загрузка...";
  return (
    <div
      className={cn(
        style.container,
        "mb-15",
        "mt-5",
        "text text_type_main-large text_color_inactive"
      )}
    >
      <p
        className={cn(
          style.text,
          "text text_type_main-large text_color_inactive"
        )}
      >
        {text}
      </p>
    </div>
  );
}
