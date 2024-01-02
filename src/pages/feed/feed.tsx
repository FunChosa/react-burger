import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Preloader from "../../components/preloader/preloader";
import { TOrders } from "../../utils/types";
import style from "./feed.module.css";
import OrdersList from "../../components/orders-list/orders-list";
import Stats from "../../components/stats/stats";
export default function Feed() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: "WS_CONNECTION_START" });
    return () => {
      dispatch({ type: "WS_CONNECTION_CLOSED" });
    };
  }, [dispatch]);
  const { orders, total, totalToday } = useSelector(
    (store: { ws: TOrders }) => store.ws
  );

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
