import React from "react";
import cn from "classnames";
import { useSelector } from "react-redux";
import style from "./burger-ingredients.module.css";
import IngredientsCategory from "./ingredients-category";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { useInView } from "react-intersection-observer";
import { useEffect, useMemo } from "react";
import { IIngredientType } from "../../utils/types";
function BurgerIngredients() {
  const data: IIngredientType[] = useSelector(
    (state: any) => state.allIngredients.allIngredients
  );

  const [buns, sauces, mains] = useMemo(() => {
    const buns = data.filter((item: IIngredientType) => item.type === "bun");
    const sauces = data.filter(
      (item: IIngredientType) => item.type === "sauce"
    );
    const mains = data.filter((item: IIngredientType) => item.type === "main");
    return [buns, sauces, mains];
  }, [data]);

  const [current, setCurrent] = React.useState("one");

  const { ref: refBun, inView: inViewBun } = useInView({ threshold: 1 });
  const { ref: refSauce, inView: inViewSauce } = useInView({ threshold: 0.8 });
  const { ref: refMain, inView: inViewMain } = useInView({ threshold: 0.4 });

  useEffect(() => {
    inViewBun
      ? setCurrent("one")
      : inViewSauce
      ? setCurrent("two")
      : setCurrent("three");
  }, [inViewBun, inViewSauce, inViewMain]);

  const ingredientCategories = [
    { text: "Булки", itemsByType: buns, ref: refBun },
    { text: "Соусы", itemsByType: sauces, ref: refSauce },
    { text: "Начинка", itemsByType: mains, ref: refMain },
  ];

  return (
    <div className={cn(style.body__container, "ml-30, mr-10")}>
      <h1 className={cn("text text_type_main-large", "pt-10 pb-5")}>
        Соберите бургер
      </h1>
      <section className={style.tabs__container}>
        <Tab value="bun" active={current === "one"} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value="sauce" active={current === "two"} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab value="main" active={current === "three"} onClick={setCurrent}>
          Начинки
        </Tab>
      </section>
      <section className={cn(style.boxes__container__scroll, "pt-2, pr-6")}>
        {ingredientCategories.map((category, index) => (
          <IngredientsCategory
            key={index}
            text={category.text}
            itemsByType={category.itemsByType}
            refForTab={category.ref}
          />
        ))}
      </section>
    </div>
  );
}

export default BurgerIngredients;
