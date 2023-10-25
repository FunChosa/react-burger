import AppHeader from "../app-header/app-header";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import BurgerIngredients from "../burger-ingredients/burger-ingredients.jsx";
import style from "./app.module.css";
import { URL_DATA } from "../../utils/data";
import { useEffect, useState } from "react";
import Modal from "../modal/modal";
function App() {
  const [data, setData] = useState([]);
  const [success, setSuccess] = useState(false);
  const [modal, setModal] = useState({
    isActive: false,
    title: null,
    content: null,
  });
  const getData = async () => {
    try {
      const response = await fetch(URL_DATA);
      if (!response.ok) {
        throw new Error("Error fetching data");
      }
      const data = await response.json();
      setData(data.data);
      setSuccess(data.success);
    } catch (error) {
      console.error(error);
      setSuccess(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  if (success) {
    return (
      <>
        <AppHeader />
        <div className={style.app__container} id="root">
          <BurgerIngredients data={data} setModal={setModal} />
          <BurgerConstructor data={data} setModal={setModal} />
        </div>

        {modal.isActive && (
          <Modal {...modal} setModal={setModal}>
            {modal.content}
          </Modal>
        )}
      </>
    );
  } else {
    return null;
  }
}

export default App;
