import BurgerIngredient from "./burger-ingredient";
import style from "./burger-ingredients.module.css";
import cn from "classnames";
import { IIngredientType } from "../../utils/types";
function IngredientsCategory({
  text,
  itemsByType,
  refForTab,
}: {
  text: string;
  itemsByType: IIngredientType[];
  refForTab: any;
}) {
  return (
    <div ref={refForTab}>
      <h2 className={cn("text text_type_main-medium", "pt-10 pb-6")}>{text}</h2>
      <section className={style.box__container}>
        {itemsByType.map((item) => {
          return <BurgerIngredient item={item} key={item._id} />;
        })}
      </section>
    </div>
  );
}
export default IngredientsCategory;
