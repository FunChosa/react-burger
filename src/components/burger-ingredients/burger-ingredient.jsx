import style from "./burger-ingredients.module.css";
import cn from "classnames";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
// import IngredientDetails from "../ingredient-details/ingredient-details";
import { ingredientType } from "../../utils/prop-types";
function BurgerIngredient({ item, setIsIngredientDetailsModalOpen }) {
  const openModal = () => {
    setIsIngredientDetailsModalOpen({
      isActive: true,
      ingredient: item,
    });
  };

  return (
    <div className={cn(style.item__container, "mb-8")} onClick={openModal}>
      <img
        className={cn("ml-4", "mr-4", "mb-1")}
        src={item.image}
        alt={item.name}
      />
      <p className={cn("mb-1", style.item__price)}>
        <strong className={cn("text text_type_digits-default", "mr-1")}>
          {item.price}
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
        {item.name}
      </p>
      <div className={cn(style.item__counter)}>
        <Counter count={1} size="default" />
      </div>
    </div>
  );
}

BurgerIngredient.propTypes = {
  item: ingredientType.isRequired,
  setIsIngredientDetailsModalOpen: PropTypes.func.isRequired,
};

export default BurgerIngredient;
