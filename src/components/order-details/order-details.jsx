import style from "./order-details.module.css";
import cn from "classnames";
import done from "../../images/done.svg";
import { orderDetailsType } from "../../utils/prop-types";

function OrderDetails({ orderDetailsData }) {
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
        {orderDetailsData.id}
      </h2>
      <p className={cn("text", "text_type_main-medium", "mb-15")}>
        {orderDetailsData.title}
      </p>
      <img
        className={cn(style.order__details__image, "mb-15")}
        src={done}
        alt="done"
      />
      <p className={cn("text", "text_type_main-default", "mb-2")}>
        {orderDetailsData.dscr}
      </p>
      <p
        className={cn(
          "text",
          "text_type_main-default",
          "text_color_inactive",
          "mb-30"
        )}
      >
        {orderDetailsData.dscr2}
      </p>
    </div>
  );
}

OrderDetails.propTypes = {
  orderDetailsData: orderDetailsType.isRequired,
};

export default OrderDetails;
