import style from "./ingredient-details.module.css";
import cn from "classnames";
import NutritionValue from "./nutrition-value";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { IIngredientType } from "../../utils/types";
function IngredientDetails() {
  const { ingredientId } = useParams();
  const ingredient: IIngredientType = useSelector((state: any) => {
    if (ingredientId) {
      return state.allIngredients.allIngredients.find(
        (item: IIngredientType) => item._id === ingredientId
      );
    } else {
      return state.ingredientDetails.ingredient;
    }
  });
  return (
    ingredient && (
      <div
        className={cn(style.ingredient__details__container, "mt-10", "mb-15")}
      >
        <img
          className={cn("mb-4", style.ingredient__details__image)}
          src={ingredient.image_large}
          alt={ingredient.name}
        />
        <p className={cn("text text_type_main-medium", "mb-8")}>
          {ingredient.name}
        </p>
        <div className={cn(style.ingredient__nutrition__values)}>
          <NutritionValue title="Калории,ккал" value={ingredient.calories} />
          <NutritionValue title="Белки,г" value={ingredient.proteins} />
          <NutritionValue title="Жиры,г" value={ingredient.fat} />
          <NutritionValue title="Углеводы,г" value={ingredient.carbohydrates} />
        </div>
      </div>
    )
  );
}

export default IngredientDetails;
