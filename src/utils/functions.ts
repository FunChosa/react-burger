import { IIngredientType } from "./types";
// список ингредиентов
export const burgerIngredientsFunction = (
  ingredients: string[],
  data: IIngredientType[]
) => {
  let newIngredients: IIngredientType[] = [];
  ingredients.forEach((ingredient: string) => {
    const ingredientData = data.find(
      (item: IIngredientType) => item._id === ingredient
    );
    if (ingredientData) {
      newIngredients.push(ingredientData);
    }
  });
  return newIngredients;
};
// общая сумма
export const totalPrice = (ingredients: string[], data: IIngredientType[]) => {
  let total = 0;
  ingredients.forEach((ingredient: string) => {
    const ingredientData = data.find(
      (item: IIngredientType) => item._id === ingredient
    );
    if (ingredientData) {
      total += ingredientData.price;
    }
  });
  return total;
};

// форматирование даты
function formatTime(date: Date): string {
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
}
export function formatDate(date: Date): string {
  const currentDate = new Date();
  const diffInMilliseconds = currentDate.getTime() - date.getTime();
  const diffInDays = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));

  if (diffInDays === 0) {
    return `сегодня в ${formatTime(date)}`;
  } else if (diffInDays === 1) {
    return `вчера в ${formatTime(date)}`;
  } else {
    return `${diffInDays} дней назад, ${formatTime(date)}`;
  }
}
// подсчитать сколько раз ингредиент входит в состав
export function addCountToObjects(ingredients: IIngredientType[]) {
  let map = new Map();
  ingredients.forEach((ingredient) => {
    const key = ingredient._id;
    if (map.has(key)) {
      map.get(key).count++;
    } else {
      ingredient.count = 1;
      map.set(key, ingredient);
    }
  });

  return Array.from(map.values());
}
// определить цвет статуса
export function getStatusColor(status: string) {
  switch (status) {
    case "created":
      return "#fff7f7";
    case "pending":
      return "#ffb561";
    case "done":
      return "#00cccc";
    default:
      return "#fff7f7";
  }
}
// определить текст статуса
export function getStatusText(status: string) {
  switch (status) {
    case "created":
      return "Создан";
    case "pending":
      return "Готовится";
    case "done":
      return "Выполнен";
    default:
      return "Не определен";
  }
}
