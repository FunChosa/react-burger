import { useEffect } from "react";
import Preloader from "../../components/preloader/preloader";
import style from "./feed.module.css";
import OrdersList from "../../components/orders-list/orders-list";
import Stats from "../../components/stats/stats";
import {
  useAppDispatch,
  useAppSelector,
} from "../../hooks/useSelector-useDispatch";
export default function Feed() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch({ type: "WS_CONNECTION_START" });
    return () => {
      dispatch({ type: "WS_CONNECTION_CLOSED" });
    };
  }, [dispatch]);

  const { orders, total, totalToday } = useAppSelector((state) => state.ws);

  if (!orders || !total || !totalToday) {
    return <Preloader />;
  }
  return (
    <>
      <main>
        <div className={style.feed__container}>
          <OrdersList />
          <Stats />
        </div>
      </main>
    </>
  );
}
