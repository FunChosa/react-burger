import AppHeader from "../app-header/app-header";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import BurgerIngredients from "../burger-ingredients/burger-ingredients.jsx";
import style from "./app.module.css";
import { data } from "../../utils/data";
function App() {
  return (
    <>
      <AppHeader />
      <div className={style.app__container}>
        <BurgerIngredients data={data} />
        <BurgerConstructor data={data} />
      </div>
    </>
  );
}

export default App;
