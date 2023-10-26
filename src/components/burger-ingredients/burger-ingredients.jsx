import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./burger-ingredients.module.css";
import React from "react";
import cn from "classnames";
import { ingredientType } from "../../utils/prop-types";
import PropTypes from "prop-types";
import IngredientsCategory from "./ingredients-category";
import { useMemo } from "react";

function BurgerIngredients({ data, setIsIngredientDetailsModalOpen }) {
  const [current, setCurrent] = React.useState("one"); /* табы */

  const itemsByType = useMemo(() => {
    return data.reduce((a, c) => {
      a[c.type] = [...(a[c.type] || []), c];
      return a;
    }, {});
  }, [data]);

  return (
    <div className={cn(style.body__container, "ml-30, mr-10")}>
      <h1 className={cn("text text_type_main-large", "pt-10 pb-5")}>
        Соберите бургер
      </h1>
      <section className={style.tabs__container}>
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
      <section className={cn(style.boxes__container__scroll, "pt-2, pr-6")}>
        <IngredientsCategory
          text="Булки"
          itemsByType={itemsByType.bun}
          setIsIngredientDetailsModalOpen={setIsIngredientDetailsModalOpen}
        />
        <IngredientsCategory
          text="Соусы"
          itemsByType={itemsByType.sauce}
          setIsIngredientDetailsModalOpen={setIsIngredientDetailsModalOpen}
        />
        <IngredientsCategory
          text="Начинка"
          itemsByType={itemsByType.main}
          setIsIngredientDetailsModalOpen={setIsIngredientDetailsModalOpen}
        />
      </section>
    </div>
  );
}

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(ingredientType.isRequired).isRequired,
  setIsIngredientDetailsModalOpen: PropTypes.func.isRequired,
};
export default BurgerIngredients;
