import style from "./profile-orders.module.css";
import cn from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { TOrder, TOrders } from "../../../utils/types";
import NavProfile from "../nav-profile/nav-profile";
import OrderCard from "../../../components/order-card/order-card";
import Preloader from "../../../components/preloader/preloader";
import { paths } from "../../../utils/paths";

export default function ProfileOrders() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: "WS_CONNECTION_START_AUTH" });
    return () => {
      dispatch({ type: "WS_CONNECTION_CLOSED_AUTH" });
    };
  }, [dispatch]);
  const { orders, total, totalToday } = useSelector(
    (store: { wsAuth: TOrders }) => store.wsAuth
  );

  if (!orders || !total || !totalToday) {
    return <Preloader />;
  }
  return (
    <>
      <div className={cn(style.body__container)}>
        <NavProfile />
        <section
          className={cn(style.boxes__container__scroll, "pt-2, pr-6, pr-3")}
        >
          {orders ? (
            orders
              .slice(0)
              .reverse()
              .map((order: TOrder) => (
                <OrderCard
                  key={order._id}
                  ingredients={order.ingredients}
                  number={order.number}
                  createdAt={order.createdAt}
                  status={order.status}
                  name={order.name}
                  path={paths.profileOrders}
                />
              ))
          ) : (
            <>
              <p className={cn("text text_type_main-medium")}>
                Заказы отсутствуют
              </p>
            </>
          )}
        </section>
      </div>
    </>
  );
}
