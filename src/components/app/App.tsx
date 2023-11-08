// @ts-nocheck
import AppHeader from "../app-header/app-header";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import BurgerIngredients from "../burger-ingredients/burger-ingredients.jsx";
import style from "./app.module.css";
import { useEffect } from "react";
import OrderDetails from "../order-details/order-details";
import IngredientDetails from "../ingredient-details/ingredient-details";
import Modal from "../modal/modal";
import { useDispatch, useSelector } from "react-redux";
import { getData } from "../../services/actions/all-ingredients-actions";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
function App() {
  const dispatch = useDispatch();
  const { allIngredientsRequest, allIngredientsFailed } = useSelector(
    (state) => state.allIngredients
  );

  const isIngredientDetailsModalOpen = useSelector(
    (state) => state.ingredientDetails.isModalActive
  );

  const isOrderDetailsModalOpen = useSelector(
    (state) => state.orderDetails.isModalActive
  );

  useEffect(() => {
    dispatch(getData());
  }, [dispatch]);

  if (allIngredientsFailed) {
    return <h1>Произошла ошибка загрузки ингридиентов</h1>;
  }
  if (allIngredientsRequest) {
    return <h1>Загрузка ингридиентов</h1>;
  }
  return (
    <>
      <AppHeader />
      <main>
        <div className={style.app__container}>
          <DndProvider backend={HTML5Backend}>
            <BurgerIngredients />
            <BurgerConstructor />
          </DndProvider>
        </div>
      </main>
      {isIngredientDetailsModalOpen && (
        <Modal title="Детали ингредиента">
          <IngredientDetails />
        </Modal>
      )}
      {isOrderDetailsModalOpen && (
        <Modal>
          <OrderDetails />
        </Modal>
      )}
    </>
  );
}

export default App;
