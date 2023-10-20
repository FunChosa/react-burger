import style from "./burger-ingredients.module.css";
import cn from "classnames";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import { ingredientType } from "../../utils/prop-types";

function RenderItems({ items }) {
  return items.map((item) => {
    const { image, name, price } = item;

    return (
      <div className={cn(style.item__container, "mb-8")} key={item._id}>
        <img className={cn("ml-4", "mr-4", "mb-1")} src={image} alt={name} />
        <p className={cn("mb-1", style.item__price)}>
          <strong className={cn("text text_type_digits-default", "mr-1")}>
            {price}
          </strong>
          <CurrencyIcon type="primary" />
        </p>
        <p
          className={cn(
            style.item__name,
            "mt-1",
            "text",
            "text_type_main-default"
          )}
        >
          {name}
        </p>
        <div className={cn(style.item__counter)}>
          <Counter count={2} size="default" />
        </div>
      </div>
    );
  });
}

RenderItems.propTypes = {
  items: PropTypes.arrayOf(ingredientType.isRequired).isRequired,
};

export default RenderItems;
