import AppHeader from "../app-header/app-header";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import BurgerIngredients from "../burger-ingredients/burger-ingredients.jsx";
import style from "./app.module.css";
import { useEffect, useState } from "react";
import OrderDetails from "../order-details/order-details";
import IngredientDetails from "../ingredient-details/ingredient-details";
import Modal from "../modal/modal";
import { getIngredients } from "../../utils/burger-api";
import { BurgerContext } from "../../services/burgerContext";

function App() {
  const [data, setData] = useState([]);
  const [success, setSuccess] = useState(false);
  const [isOrderDetailsModalOpen, setIsOrderDetailsModalOpen] = useState({
    isActive: false,
    orderNumber: "",
  });
  const [isIngredientDetailsModalOpen, setIsIngredientDetailsModalOpen] =
    useState({
      isActive: false,
      ingredient: {},
    });

  const getData = async () => {
    try {
      await getIngredients().then((res) => {
        setData(res.data);
        setSuccess(res.success);
      });
    } catch (error) {
      console.error(error);
      setSuccess(false);
    }
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!success) {
    return null;
  }
  return (
    <BurgerContext.Provider value={data}>
      <AppHeader />
      <main>
        <div className={style.app__container}>
          <BurgerIngredients
            setIsIngredientDetailsModalOpen={setIsIngredientDetailsModalOpen}
          />
          <BurgerConstructor
            setIsOrderDetailsModalOpen={setIsOrderDetailsModalOpen}
          />
        </div>
      </main>

      {isIngredientDetailsModalOpen.isActive && (
        <Modal
          handleClose={setIsIngredientDetailsModalOpen}
          title="Детали ингредиента"
        >
          <IngredientDetails
            ingredient={isIngredientDetailsModalOpen.ingredient}
          />
        </Modal>
      )}

      {isOrderDetailsModalOpen.isActive && (
        <Modal handleClose={setIsOrderDetailsModalOpen}>
          <OrderDetails orderId={isOrderDetailsModalOpen.orderNumber} />
        </Modal>
      )}
    </BurgerContext.Provider>
  );
}

export default App;
