import BurgerConstructor from "../../components/burger-constructor/burger-constructor";
import BurgerIngredients from "../../components/burger-ingredients/burger-ingredients";
import OrderDetails from "../../components/order-details/order-details";
import IngredientDetails from "../../components/ingredient-details/ingredient-details";
import Modal from "../../components/modal/modal";
import style from "./main.module.css";
import { useSelector } from "react-redux";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
export default function Main() {
  const { allIngredientsRequest, allIngredientsFailed } = useSelector(
    (state) => state.allIngredients
  );

  const isIngredientDetailsModalOpen = useSelector(
    (state) => state.ingredientDetails.isModalActive
  );

  const isOrderDetailsModalOpen = useSelector(
    (state) => state.orderDetails.isModalActive
  );

  if (allIngredientsFailed) {
    return <h1>Произошла ошибка загрузки ингредиентов</h1>;
  }
  if (allIngredientsRequest) {
    return <h1>Загрузка ингредиентов</h1>;
  }
  return (
    <>
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
