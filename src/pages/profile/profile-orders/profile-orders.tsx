import style from "./profile-orders.module.css";
import cn from "classnames";
import { useEffect } from "react";
import { TOrder } from "../../../utils/types";
import NavProfile from "../nav-profile/nav-profile";
import OrderCard from "../../../components/order-card/order-card";
import Preloader from "../../../components/preloader/preloader";
import { paths } from "../../../utils/paths";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../hooks/useSelector-useDispatch";

export default function ProfileOrders() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch({ type: "WS_CONNECTION_START_AUTH" });
    return () => {
      dispatch({ type: "WS_CONNECTION_CLOSED_AUTH" });
    };
  }, [dispatch]);

  const { orders, total, totalToday } = useAppSelector((state) => state.wsAuth);

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
