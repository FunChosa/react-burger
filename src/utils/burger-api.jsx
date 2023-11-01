import { NORMA_API } from "./data";
const checkResponse = (res) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

async function request(url, options) {
  const res = await fetch(url, options);
  return checkResponse(res);
}

async function getIngredients() {
  const res = await request(`${NORMA_API}/ingredients`);
  return res;
}

async function sentOrder(ingredients) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ingredients: ingredients.map((item) => item._id),
    }),
  };
  const res = await request(`${NORMA_API}/orders`, options);
  return res;
}

export { getIngredients, sentOrder };
