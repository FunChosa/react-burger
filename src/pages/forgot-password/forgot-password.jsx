import {
  EmailInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./forgot-password.module.css";
import cn from "classnames";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { forgotPasswordRequest } from "../../services/actions/user-actions";
function ForgotPassword() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isForgotPasswordSuccess = useSelector((state) => {
    return state.user.forgotPasswordSuccess;
  });
  const [valueEmail, setValueEmail] = useState("");
  const forgotPassword = ({ valueEmail }) => {
    return (e) => {
      e.preventDefault();
      dispatch(forgotPasswordRequest({ valueEmail }));
      localStorage.setItem("forgotPasswordEmail", valueEmail);
    };
  };

  useEffect(() => {
    if (isForgotPasswordSuccess) {
      navigate("/reset-password", { replace: true });
    }
  });

  return (
    <form
      className={cn(style.container, "mt-20")}
      onSubmit={forgotPassword({ valueEmail })}
    >
      <p className={cn("text text_type_main-medium", "mb-6")}>
        Восстановление пароля
      </p>
      <div className={cn("mb-6")}>
        <EmailInput
          placeholder="Укажите e-mail"
          onChange={(e) => setValueEmail(e.target.value)}
          value={valueEmail}
        />
      </div>
      <Button htmlType="submit">Восстановить</Button>
      <p
        className={cn(
          "text text_type_main-default text_color_inactive",
          "mt-20"
        )}
      >
        Вспомнили пароль?
        <Link to="/login" className={cn(style.link, "pl-2")}>
          Войти
        </Link>
      </p>
    </form>
  );
}

export default ForgotPassword;
