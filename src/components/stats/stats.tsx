import style from "./stats.module.css";
import cn from "classnames";
import { useSelector } from "react-redux";
import { TOrder, TOrders } from "../../utils/types";
export default function Stats() {
  const { orders, total, totalToday } = useSelector(
    (store: { ws: TOrders }) => store.ws
  );
  // заказы созданные и в обработке
  const ordersPendingOrCreated = orders
    .filter(
      (order: TOrder) =>
        order.status === "pending" || order.status === "created"
    )
    .slice(0, 20);
  // заказы готовые
  const ordersDone = orders
    .filter((order: TOrder) => order.status === "done")
    .slice(0, 20);

  return (
    <div className={cn("mt-25")}>
      <section className={cn(style.stats__container, "mb-15")}>
        <div className={cn(style.ready__container)}>
          <p className={cn("text text_type_main-medium", "mb-6")}>Готовы:</p>
          <ul className={cn(style.ready__list)}>
            {ordersDone.map((order: TOrder) => (
              <li
                key={order.number}
                className={cn("text text_type_digits-default", "mb-2")}
              >
                {order.number}
              </li>
            ))}
          </ul>
        </div>
        <div className={cn(style.in_progress__container)}>
          <p className={cn("text text_type_main-medium", "mb-6")}>В работе:</p>
          <ul className={cn(style.in_progress__list)}>
            {ordersPendingOrCreated.map((order: TOrder) => (
              <li
                key={order.number}
                className={cn("text text_type_digits-default", "mb-2")}
              >
                {order.number}
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section className={cn("mt-14")}>
        <p className={cn("text text_type_main-medium")}>
          Выполнено за все время:
        </p>
        <p
          className={cn(
            style.order__details__title,
            "text text_type_digits-large"
          )}
        >
          {total || 0}
        </p>
      </section>
      <section className={cn("mt-15")}>
        <p className={cn("text text_type_main-medium")}>
          Выполнено за сегодня:
        </p>
        <p className={cn("text text_type_digits-large")}>{totalToday || 0}</p>
      </section>
    </div>
  );
}
