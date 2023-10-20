import RenderItems from "./render-items";
import style from "./burger-ingredients.module.css";
import cn from "classnames";
import PropTypes from "prop-types";
import { ingredientType } from "../../utils/prop-types";
function IngredientsCategory({ text, itemsByType }) {
  return (
    <>
      <h2 className={cn("text text_type_main-medium", "pt-10 pb-6")}>{text}</h2>
      <section className={style.box__container}>
        <RenderItems items={itemsByType} />
      </section>
    </>
  );
}
IngredientsCategory.propTypes = {
  text: PropTypes.string.isRequired,
  itemsByType: PropTypes.arrayOf(ingredientType).isRequired,
};

export default IngredientsCategory;
