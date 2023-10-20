import {
  ConstructorElement,
  Button,
  CurrencyIcon,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./burger-constructor.module.css";
import cn from "classnames";
import { ingredientType } from "../../utils/prop-types";
import PropTypes from "prop-types";
import { useMemo } from "react";
const BurgerConstructor = ({ data }) => {
  const { bun, ingredients } = useMemo(() => {
    return {
      bun: data.find((item) => item.type === "bun"),
      ingredients: data.filter((item) => item.type !== "bun"),
    };
  }, [data]);

  return (
    <div className={cn(style.body__container, "mt-25")}>
      <section className={cn(style.outside__item, "mb-4")}>
        <ConstructorElement
          type="top"
          isLocked={true}
          text={bun.name + " (верх)"}
          price={bun.price}
          thumbnail={bun.image}
        />
      </section>
      <ul className={style.list__of__items}>
        {ingredients.map((item) => (
          <li className={cn(style.inside__item, "mb-4")} key={item._id}>
            <DragIcon type="primary" />
            <ConstructorElement
              text={item.name}
              price={item.price}
              thumbnail={item.image}
            />
          </li>
        ))}
      </ul>
      <section className={cn(style.outside__item, "mb-10")}>
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text={bun.name + " (низ)"}
          price={bun.price}
          thumbnail={bun.image}
        />
      </section>
      <section className={style.info}>
        <div className={cn(style.price, "pr-10")}>
          <span className={cn("text text_type_digits-medium", "pr-2")}>
            610
          </span>
          <CurrencyIcon type="primary" />
        </div>
        <Button type="primary" size="large" htmlType="button">
          Оформить заказ
        </Button>
      </section>
    </div>
  );
};

BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(ingredientType.isRequired).isRequired,
};

export default BurgerConstructor;
