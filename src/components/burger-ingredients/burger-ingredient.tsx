import style from "./burger-ingredients.module.css";
import cn from "classnames";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrag } from "react-dnd";
import { Link, useLocation } from "react-router-dom";
import { IIngredientType } from "../../utils/types";
import { useAppSelector } from "../../hooks/useSelector-useDispatch";
function BurgerIngredient({ item }: { item: IIngredientType }) {
  const location = useLocation();
  const ingredientId = item._id;
  const { counts, bun } = useAppSelector(
    (store) => store.constructorIngrediens
  );

  const count =
    item.type === "bun" && bun && bun._id === item._id ? 2 : counts[item._id];

  const [{ isDragging }, dragRef] = useDrag({
    type: "ingredient",
    item: item,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const borderColor = isDragging ? "rgba(76, 76, 255, 1)" : "transparent";

  return (
    <Link
      key={ingredientId}
      to={{
        pathname: `/ingredients/${ingredientId}`,
      }}
      state={{ background: location }}
      className={cn(style.link, "text text_type_main-default")}
    >
      <div
        className={cn(style.item__container, "mb-8", "p-1")}
        ref={dragRef}
        style={{ borderColor }}
        data-cy={`ingredient-card-${item._id}`}
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
            "mb-1",
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
    </Link>
  );
}
export default BurgerIngredient;
