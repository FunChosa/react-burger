import style from "./order-card.module.css";
import cn from "classnames";
import { IIngredientType, TOrder } from "../../utils/types";
import {
  formatDate,
  totalPrice,
  burgerIngredientsFunction,
  getStatusColor,
  getStatusText,
} from "../../utils/functions";
import { useSelector } from "react-redux";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { v4 as uuidv4 } from "uuid";
import { Link, useLocation } from "react-router-dom";
import { TRootState } from "../../services/reducers/root-reducer";

export default function OrderCard({
  ingredients,
  number,
  createdAt,
  name,
  status,
  path,
}: TOrder) {
  const data: IIngredientType[] = useSelector(
    (state: TRootState) => state.allIngredients.allIngredients
  );
  const maxElementsToRender = 6;
  let zIndex = maxElementsToRender;
  const count = ingredients.length;
  const numberOfIngredients = count - maxElementsToRender;
  const burgerIngredients = burgerIngredientsFunction(ingredients, data);
  const burgerItem = burgerIngredients.slice(0, maxElementsToRender);
  const location = useLocation();
  const id = number;

  return (
    <>
      <Link
        key={id}
        to={{
          pathname: `${path}/${id}`,
        }}
        state={{ background: location }}
        className={cn(style.link, "text text_type_main-default")}
      >
        <div className={cn(style.order__card__container, "mb-4")}>
          <div className={cn(style.order__card__content)}>
            <section className={cn(style.order__number__and__time, "mb-2")}>
              <p className={cn("text text_type_digits-default")}>#{number}</p>
              <p
                className={cn(
                  "text text_type_main-default text_color_inactive"
                )}
              >
                {formatDate(new Date(createdAt))}
              </p>
            </section>
            <section className={cn("mb-2")}>
              <p
                className={cn(
                  style.order__details__title,
                  "text text_type_main-medium"
                )}
              >
                {name}
              </p>
              {status && (
                <p
                  className={cn("text text_type_main-default", "mt-2")}
                  style={{ color: getStatusColor(status) }}
                >
                  {getStatusText(status)}
                </p>
              )}
            </section>
            <section className={cn(style.ingredients__and__price, "mt-0")}>
              <div>
                <ul className={cn(style.list)}>
                  {burgerItem.map((item: IIngredientType) => {
                    zIndex -= 1;
                    return (
                      <li
                        className={style.list__item}
                        key={uuidv4()}
                        style={{ zIndex: zIndex }}
                      >
                        <div
                          className={style.image__mobile}
                          style={
                            zIndex === 0 && numberOfIngredients
                              ? { opacity: "40%" }
                              : undefined
                          }
                        >
                          <img src={item.image_mobile} alt={item.name} />
                        </div>
                        {zIndex === 0 && numberOfIngredients > 0 && (
                          <p
                            className={cn(style.text)}
                          >{`+${numberOfIngredients}`}</p>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div className={cn(style.price, "text text_type_digits-default")}>
                <p
                  className={cn(
                    style.price__text,
                    "mr-2",
                    "text text_type_digits-medium"
                  )}
                >
                  {totalPrice(ingredients, data)}
                </p>
                <CurrencyIcon type="primary" />
              </div>
            </section>
          </div>
        </div>
      </Link>
    </>
  );
}
