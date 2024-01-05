import style from "./order-summary.module.css";
import cn from "classnames";
import done from "../../images/done.svg";
import { useAppSelector } from "../../hooks/useSelector-useDispatch";

const OrderSummary = () => {
  const modalText = {
    orderIdentifier: "идентификатор заказа",
    title: "Ваш заказ начали готовить",
    subtitle: "Дождитесь готовности на орбитальной станции",
  };

  const orderNumber: number | null = useAppSelector(
    (state) => state.orderDetails.orderNumber
  );

  return (
    <div className={cn(style.order__details__container, "mt-10")}>
      <h2
        className={cn(
          style.order__details__title,
          "text",
          "text_type_digits-large",
          "mb-2"
        )}
      >
        {orderNumber}
      </h2>
      <p className={cn("text", "text_type_main-medium", "mb-15")}>
        {modalText.orderIdentifier}
      </p>
      <img
        className={cn(style.order__details__image, "mb-15")}
        src={done}
        alt="done"
      />
      <p className={cn("text", "text_type_main-default", "mb-2")}>
        {modalText.title}
      </p>
      <p
        className={cn(
          "text",
          "text_type_main-default",
          "text_color_inactive",
          "mb-30"
        )}
      >
        {modalText.subtitle}
      </p>
    </div>
  );
};

export default OrderSummary;
