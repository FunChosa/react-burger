import {
  ConstructorElement,
  Button,
  CurrencyIcon,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./burger-constructor.module.css";
import cn from "classnames";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import PropTypes from "prop-types";

const BurgerConstructor = ({ data }) => {
  return (
    <div className={cn(style.body__container, "mt-25")}> { /* главный контейнер со всем содержимым */ }
      <section className={cn(style.outside__item, "mb-4")}> { /* верхняя бувочка */ }
        <ConstructorElement
          type="top"
          isLocked={true}
          text={data[0].name + " (верх)"}
          price={data[0].price}
          thumbnail={data[0].image}
        />
      </section>

      <ul className={style.list__of__items}> { /* список внутренних ингридиентов + скролл */ }
        {data.map((item) => (
          <li className={cn(style.inside__item, "mb-4")}> { /* отдельный ингридиент */ }
            <DragIcon type="primary" />
            <ConstructorElement
              text={item.name}
              price={item.price}
              thumbnail={item.image}
            />
          </li>
        ))}
      </ul>

      <section className={cn(style.outside__item, "mb-10")}> { /* нижняя бувочка */ }
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text={data[0].name + " (низ)"}
          price={data[0].price}
          thumbnail={data[0].image}
        />
      </section>

      <section className={style.info}> { /* нижнее меню с итоговой суммой и кнопкой */ }
        <div className={cn(style.price, "pr-10")}> { /* сумма */ }
          <span className={cn("text text_type_digits-medium", "pr-2")}>
            610
          </span>
          <CurrencyIcon type="primary" />
        </div>
        <Button type="primary" size="large"> { /* кнопка */ }
          Оформить заказ
        </Button>
      </section>
    </div>
  );
};

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
  })),
}

export default BurgerConstructor;

