import { NORMA_API } from "../utils/data";
const checkResponse = (res) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

async function getIngredients() {
  const res = await fetch(`${NORMA_API}/ingredients`);
  return checkResponse(res);
}

async function sentOrder(ingredients) {
  const res = await fetch(`${NORMA_API}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ingredients: ingredients.map((item) => item._id),
    }),
  });
  return checkResponse(res);
}

export { getIngredients, sentOrder };
