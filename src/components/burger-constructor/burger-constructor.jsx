import {
  ConstructorElement,
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./burger-constructor.module.css";
import cn from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { postOrderRequest } from "../../services/actions/order-details-actions";
import { useDrop } from "react-dnd/dist/hooks";
import BurgerConstructorIngredients from "./burger-constructor-ingredients";
import { v4 as uuidv4 } from "uuid";
import { getCookie } from "../../utils/cookie-handler";
import { useNavigate } from "react-router-dom";

const BurgerConstructor = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { bun, ingredients } = useSelector(
    (state) => state.constructorIngrediens
  );

  const createOrder = () => {
    const token =
      getCookie("accessToken") || localStorage.getItem("refreshToken");
    !token ? navigate("/login") : dispatch(postOrderRequest(ingredients));
  };

  const totalAmount = (ingredients, bun) => {
    const totalIngredientsPrice = ingredients.reduce(
      (acc, item) => acc + item.price,
      0
    );
    const totalBunPrice = bun.price * 2 || 0;
    const totalPrice = totalIngredientsPrice + totalBunPrice;
    return totalPrice > -1 ? totalPrice : 0;
  };

  const [, dropTarget] = useDrop({
    accept: "ingredient",
    drop(item) {
      dispatch({ type: "ADD_INGREDIENT", item: item, key: uuidv4() });
      dispatch({
        type: "INCREASE_COUNTER",
        itemType: item.type,
        itemId: item._id,
      });
    },
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
  });

  return (
    <div className={cn(style.body__container, "mt-25")} ref={dropTarget}>
      {Object.entries(bun).length !== 0 && (
        <section className={cn(style.outside__item, "mb-4")}>
          <ConstructorElement
            type="top"
            isLocked={true}
            text={bun.name + " (верх)"}
            price={bun.price}
            thumbnail={bun.image}
          />
        </section>
      )}
      <ul className={style.list__of__items}>
        {ingredients.map((item, index) => (
          <BurgerConstructorIngredients
            item={item}
            index={index}
            key={item.key}
          />
        ))}
      </ul>
      {Object.entries(bun).length !== 0 && (
        <section className={cn(style.outside__item, "mb-10")}>
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={bun.name + " (низ)"}
            price={bun.price}
            thumbnail={bun.image}
          />
        </section>
      )}
      {(Object.entries(bun).length !== 0 || ingredients.length !== 0) && (
        <section className={style.info}>
          <div className={cn(style.price, "pr-10")}>
            <span className={cn("text text_type_digits-medium", "pr-2")}>
              {totalAmount(ingredients, bun)}
            </span>
            <CurrencyIcon type="primary" />
          </div>
          <Button
            type="primary"
            size="large"
            htmlType="button"
            disabled={ingredients.length === 0 || bun._id === undefined}
            onClick={createOrder}
          >
            Оформить заказ
          </Button>
        </section>
      )}
    </div>
  );
};

export default BurgerConstructor;
