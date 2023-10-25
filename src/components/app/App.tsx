import AppHeader from "../app-header/app-header";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import BurgerIngredients from "../burger-ingredients/burger-ingredients.jsx";
import style from "./app.module.css";
import { NORMA_API } from "../../utils/data";
import { useEffect, useState } from "react";
import OrderDetails from "../order-details/order-details";
import IngredientDetails from "../ingredient-details/ingredient-details";
import Modal from "../modal/modal";
function App() {
  const [data, setData] = useState([]);
  const [success, setSuccess] = useState(false);

  const [isIngredientDetailsModalOpen, setIsIngredientDetailsModalOpen] =
    useState({
      isActive: false,
      ingredient: {},
    });

  const [isOrderDetailsModalOpen, setIsOrderDetailsModalOpen] = useState(false);
  const checkResponse = (res: { ok: any; json: () => Promise<any> }) => {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
  };

  const getData = async () => {
    try {
      fetch(NORMA_API)
        .then(checkResponse)
        .then((data) => {
          setData(data.data);
          setSuccess(data.success);
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

  if (success) {
    return (
      <>
        <AppHeader />
        <div className={style.app__container} id="root">
          <BurgerIngredients
            data={data}
            setIsIngredientDetailsModalOpen={setIsIngredientDetailsModalOpen}
          />
          <BurgerConstructor
            data={data}
            setIsOrderDetailsModalOpen={setIsOrderDetailsModalOpen}
          />
        </div>

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

        {isOrderDetailsModalOpen && (
          <Modal handleClose={setIsOrderDetailsModalOpen}>
            <OrderDetails id={"123456"} />
          </Modal>
        )}
      </>
    );
  } else {
    return null;
  }
}

export default App;
