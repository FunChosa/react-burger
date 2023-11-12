import {
  Input,
  Button,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./reset-password.module.css";
import cn from "classnames";
import { useEffect, useState } from "react";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetPasswordRequest } from "../../services/actions/user-actions";
function ResetPassword() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isResetPasswordSuccess = useSelector(
    (state) => state.user.resetPasswordSuccess
  );
  const [resetPasswordInfo, setResetPasswordInfo] = useState({
    password: "",
    resetToken: "",
  });

  const resetPassword = (e) => {
    e.preventDefault();
    dispatch(resetPasswordRequest({ ...resetPasswordInfo }));
  };
  useEffect(() => {
    if (isResetPasswordSuccess) {
      localStorage.removeItem("forgotPasswordEmail");
      navigate("/login", { replace: true });
    }
  });
  const handleInputChange = (field, value) => {
    setResetPasswordInfo((prevInfo) => ({
      ...prevInfo,
      [field]: value,
    }));
  };

  if (localStorage.getItem("forgotPasswordEmail") === null) {
    return <Navigate to="/forgot-password" />;
  }

  return (
    <form className={cn(style.container, "mt-20")} onSubmit={resetPassword}>
      <p className={cn("text text_type_main-medium", "mb-6")}>
        Восстановление пароля
      </p>
      <div className={cn("mb-6")}>
        <PasswordInput
          onChange={(e) => handleInputChange("password", e.target.value)}
          value={resetPasswordInfo.password}
          placeholder="Введите новый пароль"
        />
      </div>
      <div className={cn("mb-6")}>
        <Input
          placeholder="Введите код из письма"
          onChange={(e) => handleInputChange("resetToken", e.target.value)}
          value={resetPasswordInfo.resetToken}
        />
      </div>
      <Button htmlType="submit">Сохранить</Button>
      <p
        className={cn(
          "text text_type_main-default text_color_inactive",
          "mt-20"
        )}
      >
        Вспомнили пароль?
        <NavLink to="/login" className={cn(style.link, "pl-2")}>
          Войти
        </NavLink>
      </p>
    </form>
  );
}
export default ResetPassword;
