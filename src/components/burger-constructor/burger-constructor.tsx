import {
  ConstructorElement,
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./burger-constructor.module.css";
import cn from "classnames";

import { postOrderRequest } from "../../services/actions/order-details-actions";
import { useDrop } from "react-dnd/dist/hooks";
import BurgerConstructorIngredients from "./burger-constructor-ingredients";
import { v4 as uuidv4 } from "uuid";
import { getCookie } from "../../utils/cookie-handler";
import { useNavigate } from "react-router-dom";
import { IIngredientType } from "../../utils/types";
import Preloader from "../preloader/preloader";
import {
  useAppDispatch,
  useAppSelector,
} from "../../hooks/useSelector-useDispatch";

const BurgerConstructor = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { bun, ingredients } = useAppSelector(
    (state) => state.constructorIngrediens
  );

  const allIngredients = [bun, ...ingredients, bun];

  const createOrder = () => {
    const token =
      getCookie("accessToken") || localStorage.getItem("refreshToken");

    !token
      ? navigate("/login")
      : dispatch(postOrderRequest(allIngredients) as any);
  };

  const totalAmount = (
    ingredients: IIngredientType[],
    bun: IIngredientType
  ) => {
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
    drop(item: IIngredientType) {
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

  const { orderRequest } = useAppSelector((state) => state.orderDetails);
  if (orderRequest) {
    return <Preloader text="Создание заказа..." />;
  }
  return (
    <div
      className={cn(style.body__container, "mt-25")}
      ref={dropTarget}
      data-cy="burger-constructor"
    >
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
        {ingredients.map((item: IIngredientType, index: number) => (
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
