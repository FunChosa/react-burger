import { useEffect } from "react";
import { useParams } from "react-router";
import Preloader from "../preloader/preloader";
import { IIngredientType } from "../../utils/types";
import style from "./order-details.module.css";
import cn from "classnames";
import {
  addCountToObjects,
  burgerIngredientsFunction,
  formatDate,
  totalPrice,
} from "../../utils/functions";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import {
  useAppDispatch,
  useAppSelector,
} from "../../hooks/useSelector-useDispatch";
export default function OrderDetails() {
  const { id } = useParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch({ type: "WS_CONNECTION_START" });
    return () => {
      dispatch({ type: "WS_CONNECTION_CLOSED" });
    };
  }, [dispatch]);

  const data: IIngredientType[] = useAppSelector(
    (state) => state.allIngredients.allIngredients
  );
  const { orders } = useAppSelector((state) => state.ws);
  const currentOrder = orders.find(
    (order: { number: number }) => order.number === Number(id)
  );

  const currentOrderIngredients = currentOrder?.ingredients
    ? burgerIngredientsFunction(currentOrder.ingredients, data)
    : [];
  const currentOrderIngredientsCount = addCountToObjects(
    currentOrderIngredients
  );

  if (!currentOrder) {
    return <Preloader />;
  }
  return (
    <div className={cn(style.order__details__container, "mt-10, mb-10")}>
      <p
        className={cn(
          "text text_type_digits-default text_color_inactive",
          "mb-10"
        )}
      >
        #{currentOrder.number}
      </p>
      <p
        className={cn(
          style.order__details__title,
          "text text_type_main-medium",
          "mb-3 pl-2 pr-2"
        )}
      >
        {currentOrder.name}
      </p>
      <p
        className={cn("text text_type_main-default", "mb-15")}
        style={
          currentOrder.status === "created"
            ? { color: "#00CCCC" }
            : currentOrder.status === "pending"
            ? { color: "#F2C94C" }
            : { color: "#00CCCC" }
        }
      >
        {currentOrder.status === "created"
          ? "Создан"
          : currentOrder.status === "pending"
          ? "Готовится"
          : "Выполнен"}
      </p>
      <p className={cn("text text_type_main-medium", "mb-4")}>Состав:</p>
      <div className={cn(style.boxes__container__scroll, "mb-10, pt-2, pr-6")}>
        {currentOrderIngredientsCount.map((ingredient: IIngredientType) => (
          <div
            className={cn(style.ingredient__container, "mb-3")}
            key={ingredient._id}
          >
            <div className={cn(style.ingredient__info, "mr-6")}>
              <div className={cn(style.image__mobile, "mr-4")}>
                <img src={ingredient.image_mobile} alt={ingredient.name} />
              </div>
              <p
                className={cn(
                  style.ingredient__title,
                  "text text_type_main-small"
                )}
              >
                {ingredient.name}
              </p>
            </div>
            <p
              className={cn(
                style.price__text,

                "text text_type_digits-default"
              )}
            >
              {ingredient.count} x {ingredient.price}
              <span className={cn("ml-2")}>
                <CurrencyIcon type="primary" />
              </span>
            </p>
          </div>
        ))}
      </div>
      <div className={cn(style.price__and__date, "mt-5")}>
        <p className={cn("text text_type_main-default text_color_inactive")}>
          {formatDate(new Date(currentOrder.createdAt))}
        </p>
        <p
          className={cn(
            style.price__text,
            "text text_type_digits-medium",
            "mb-2"
          )}
        >
          {totalPrice(currentOrder.ingredients, data)}
          <span className={cn("ml-2")}>
            <CurrencyIcon type="primary" />
          </span>
        </p>
      </div>
    </div>
  );
}
