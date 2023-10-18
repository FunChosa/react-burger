import {
    Tab,
    CurrencyIcon,
    Counter
  } from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./burger-ingredients.module.css";
import React from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';


function BurgerIngredients({ data }) {
  const [current, setCurrent] = React.useState("one"); /* табы */ 

  const itemsByType = data.reduce((a, c) => {  /* группируем ингридиенты по типу */
    a[c.type] = [...(a[c.type] || []), c];
    return a;
  }, {});

  const renderItems = (items) => {
    return items.map((item) => (
      <div className={cn(style.item__container, "mb-8")}> { /* отдельный ингридиент */ }
        <img className={cn("ml-4", "mr-4", "mb-1")} src={item.image} alt={item.name} /> { /* изображение ингридиента */ }
        <p className={cn("mb-1", style.item__price)}> { /* цена ингридиента и иконка валюты */ }
          <p className={cn("text text_type_digits-default", "mr-1")}>{item.price}</p>
          <CurrencyIcon type="primary" />
        </p>
        <p className={cn(style.item__name, "mt-1", "text", "text_type_main-default")}>{item.name}</p> { /* название ингридиента */ }
        <div className={cn(style.item__counter)}> { /* счетчик */ }
          <Counter count={2} size="default" />
        </div>
      </div>
    ));
  };

  return (
    <body className={cn(style.body__container, "ml-30, mr-10")}> { /* главный контейнер со всем содержимым */ }
      <h1 className={cn("text text_type_main-large", "pt-10 pb-5")}>Соберите бургер</h1> { /* заголовок */ }

      <section className={style.tabs__container}> { /* контейнер с табами */ }
        <Tab value="one" active={current === "one"} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value="two" active={current === "two"} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab value="three" active={current === "three"} onClick={setCurrent}>
          Начинки
        </Tab>
      </section>

      <section className={cn(style.boxes__container__scroll, "pt-2, pr-6")}> { /* контейнер с боксами + скролл */ }
        <h2 className={cn("text text_type_main-medium", "pt-10 pb-6")}>Булки</h2> {/* заголовок Булки */ }
        <section className={style.box__container}>{renderItems(itemsByType.bun)}</section> { /* бокс с бувочками */ }

        <h2 className={cn("text text_type_main-medium", "pt-10 pb-6")}>Соусы</h2> {/* заголовок Соусы */ }
        <section className={style.box__container}>{renderItems(itemsByType.sauce)}</section>{ /* бокс с соусами */ }

        <h2 className={cn("text text_type_main-medium", "pt-10 pb-6")}>Начинка</h2> {/* заголовок Начинка */ }
        <section className={style.box__container}>{renderItems(itemsByType.main)}</section> { /* бокс с начинками */ }
      </section>
    </body>
  );
}

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired
  })),
}

export default BurgerIngredients;
