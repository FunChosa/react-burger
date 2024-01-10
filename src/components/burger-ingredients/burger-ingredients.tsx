import React from "react";
import cn from "classnames";
import style from "./burger-ingredients.module.css";
import IngredientsCategory from "./ingredients-category";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { useInView } from "react-intersection-observer";
import { useEffect, useMemo } from "react";
import { IIngredientType } from "../../utils/types";
import { useAppSelector } from "../../hooks/useSelector-useDispatch";
function BurgerIngredients() {
  const data: IIngredientType[] = useAppSelector(
    (state) => state.allIngredients.allIngredients
  );

  const [buns, sauces, mains] = useMemo(() => {
    const buns = data.filter((item: IIngredientType) => item.type === "bun");
    const sauces = data.filter(
      (item: IIngredientType) => item.type === "sauce"
    );
    const mains = data.filter((item: IIngredientType) => item.type === "main");
    return [buns, sauces, mains];
  }, [data]);

  const [current, setCurrent] = React.useState("buns");

  const [refBun, inViewBun] = useInView({ threshold: 1 });
  const [refSauce, inViewSauce] = useInView({ threshold: 0.8 });
  const [refMain, inViewMain] = useInView({ threshold: 0.4 });

  useEffect(() => {
    if (inViewBun) setCurrent("buns");
    if (inViewSauce) setCurrent("sauces");
    if (inViewMain) setCurrent("mains");
  }, [inViewBun, inViewSauce, inViewMain]);

  const onTabClick = (tab: string) => {
    setCurrent(tab);
    const tabElement = document.getElementById(tab);
    if (tabElement)
      tabElement.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className={cn(style.body__container, "ml-30, mr-10")}>
      <h1 className={cn("text text_type_main-large", "pt-10 pb-5")}>
        Соберите бургер
      </h1>
      <section className={style.tabs__container}>
        <Tab value="buns" active={current === "buns"} onClick={onTabClick}>
          Булки
        </Tab>
        <Tab value="sauces" active={current === "sauces"} onClick={onTabClick}>
          Соусы
        </Tab>
        <Tab value="mains" active={current === "mains"} onClick={onTabClick}>
          Начинки
        </Tab>
      </section>
      <section className={cn(style.boxes__container__scroll, "pt-2, pr-6")}>
        <IngredientsCategory
          text="Булки"
          tabId="buns"
          itemsByType={buns}
          refForTab={refBun}
        />
        <IngredientsCategory
          text="Соусы"
          tabId="sauces"
          itemsByType={sauces}
          refForTab={refSauce}
        />
        <IngredientsCategory
          text="Начинки"
          tabId="mains"
          itemsByType={mains}
          refForTab={refMain}
        />
      </section>
    </div>
  );
}

export default BurgerIngredients;
