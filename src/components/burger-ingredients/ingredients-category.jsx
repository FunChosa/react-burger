import BurgerIngredient from "./burger-ingredient";
import style from "./burger-ingredients.module.css";
import cn from "classnames";
import PropTypes from "prop-types";
import { ingredientType } from "../../utils/prop-types";
function IngredientsCategory({
  text,
  itemsByType,
  setIsIngredientDetailsModalOpen,
}) {
  return (
    <>
      <h2 className={cn("text text_type_main-medium", "pt-10 pb-6")}>{text}</h2>
      <section className={style.box__container}>
        {itemsByType.map((item) => {
          return (
            <BurgerIngredient
              item={item}
              setIsIngredientDetailsModalOpen={setIsIngredientDetailsModalOpen}
              key={item._id}
            />
          );
        })}
      </section>
    </>
  );
}
IngredientsCategory.propTypes = {
  text: PropTypes.string.isRequired,
  itemsByType: PropTypes.arrayOf(ingredientType).isRequired,
  setIsIngredientDetailsModalOpen: PropTypes.func.isRequired,
};

export default IngredientsCategory;
