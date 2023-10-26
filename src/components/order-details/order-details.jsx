import style from "./order-details.module.css";
import cn from "classnames";
import done from "../../images/done.svg";
import PropTypes from "prop-types";

const OrderDetails = ({ id }) => {
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
        {id}
      </h2>
      <p className={cn("text", "text_type_main-medium", "mb-15")}>
        идентификатор заказа
      </p>
      <img
        className={cn(style.order__details__image, "mb-15")}
        src={done}
        alt="done"
      />
      <p className={cn("text", "text_type_main-default", "mb-2")}>
        Ваш заказ начали готовить
      </p>
      <p
        className={cn(
          "text",
          "text_type_main-default",
          "text_color_inactive",
          "mb-30"
        )}
      >
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
};

OrderDetails.propTypes = {
  id: PropTypes.string.isRequired,
};

export default OrderDetails;
