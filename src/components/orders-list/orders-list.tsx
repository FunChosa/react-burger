import style from "./orders-list.module.css";
import cn from "classnames";
import OrderCard from "../order-card/order-card";
import { TOrder, TOrders } from "../../utils/types";
import { useSelector } from "react-redux";
import { paths } from "../../utils/paths";

export default function OrdersList() {
  const { orders } = useSelector((store: { ws: TOrders }) => store.ws);

  return (
    <div className={cn(style.body__container, "ml-30, mr-10")}>
      <h1 className={cn("text text_type_main-large", "pt-10 pb-5")}>
        Лента заказов
      </h1>

      <section className={cn(style.boxes__container__scroll, "pt-2, pr-6")}>
        {orders.map((order: TOrder) => (
          <OrderCard
            key={order._id}
            ingredients={order.ingredients}
            number={order.number}
            createdAt={order.createdAt}
            name={order.name}
            path={paths.feed}
          />
        ))}
      </section>
    </div>
  );
}
