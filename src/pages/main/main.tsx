import BurgerConstructor from "../../components/burger-constructor/burger-constructor";
import BurgerIngredients from "../../components/burger-ingredients/burger-ingredients";
import OrderSummary from "../../components/order-summary/order-summary";
import Modal from "../../components/modal/modal";
import style from "./main.module.css";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Preloader from "../../components/preloader/preloader";
import {
  useAppDispatch,
  useAppSelector,
} from "../../hooks/useSelector-useDispatch";
export default function Main() {
  const dispatch = useAppDispatch();
  const {
    allIngredientsRequest,
    allIngredientsFailed,
  }: { allIngredientsRequest: boolean; allIngredientsFailed: boolean } =
    useAppSelector((state) => state.allIngredients);

  const isOrderDetailsModalOpen: boolean = useAppSelector(
    (state) => state.orderDetails.isModalActive
  );
  const handleOrderDetailsModalClose = () => {
    dispatch({ type: "CLOSE_MODAL_ORDER_DETAILS" });
  };

  if (allIngredientsFailed) {
    return <h1>Произошла ошибка загрузки ингредиентов</h1>;
  }
  if (allIngredientsRequest) {
    return <Preloader />;
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
      {isOrderDetailsModalOpen && (
        <Modal onClose={handleOrderDetailsModalClose}>
          <OrderSummary />
        </Modal>
      )}
    </>
  );
}
