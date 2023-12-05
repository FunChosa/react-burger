import cn from "classnames";
import style from "./ingredient-details.module.css";
function NutritionValue({ title, value }: { title: string; value: number }) {
  return (
    <div className={cn(style.ingredient__nutrition__value__item)}>
      <div className={cn("text text_type_main-default text_color_inactive")}>
        {title}
        <p
          className={cn(
            style.ingredient__nutrition__value__item__value,
            "text text_type_digits-default",
            "mt-2"
          )}
        >
          {value}
        </p>
      </div>
    </div>
  );
}

export default NutritionValue;
