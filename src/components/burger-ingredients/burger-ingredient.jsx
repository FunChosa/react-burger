import style from "./burger-ingredients.module.css";
import cn from "classnames";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { ingredientType } from "../../utils/prop-types";
import { useDispatch, useSelector } from "react-redux";
import { useDrag } from "react-dnd";
function BurgerIngredient({ item }) {
  const dispatch = useDispatch();

  const openModal = () => {
    dispatch({ type: "OPEN_MODAL_INGREDIENT_DETAILS", ingredient: item });
  };

  const { counts, bun } = useSelector((store) => store.constructorIngrediens);

  const count =
    item.type === "bun" && bun && bun._id === item._id ? 2 : counts[item._id];

  const [{ isDragging }, dragRef] = useDrag({
    type: "ingredient",
    item: item,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const borderTopColor = isDragging ? "rgba(76, 76, 255, 0.7)" : "transparent";
  const borderBottomColor = isDragging
    ? "rgba(76, 76, 255, 0.7)"
    : "transparent";

  return (
    <div
      className={cn(style.item__container, "mb-8")}
      onClick={openModal}
      ref={dragRef}
      style={{ borderTopColor, borderBottomColor }}
    >
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
        {count > 0 && <Counter count={count} size="default" />}
      </div>
    </div>
  );
}

BurgerIngredient.propTypes = {
  item: ingredientType.isRequired,
};

export default BurgerIngredient;
