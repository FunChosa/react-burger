import {
  EmailInput,
  Button,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./login.module.css";
import cn from "classnames";
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { login } from "../../services/actions/user-actions";
import { useDispatch, useSelector } from "react-redux";
function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoginSuccess = useSelector((state) => {
    return state.user.loginSuccess;
  });
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });
  const loginForm = (e) => {
    e.preventDefault();
    dispatch(login({ ...loginInfo })).then(() => {});
  };

  useEffect(() => {
    if (isLoginSuccess) {
      navigate("/", { replace: true });
    }
  }, [isLoginSuccess, navigate]);
  const handleInputChange = (field, value) => {
    setLoginInfo((prevInfo) => ({
      ...prevInfo,
      [field]: value,
    }));
  };

  return (
    <form className={cn(style.container, "mt-20")} onSubmit={loginForm}>
      <p className={cn("text text_type_main-medium", "mb-6")}>Вход</p>
      <div className={cn("mb-6")}>
        <EmailInput
          placeholder="Укажите e-mail"
          onChange={(e) => handleInputChange("email", e.target.value)}
          value={loginInfo.email}
          name="email"
        />
      </div>
      <div className={cn("mb-6")}>
        <PasswordInput
          onChange={(e) => handleInputChange("password", e.target.value)}
          value={loginInfo.password}
          name="password"
        />
      </div>
      <p></p>
      <Button htmlType="submit">Войти</Button>
      <p
        className={cn(
          "text text_type_main-default text_color_inactive",
          "mt-15"
        )}
      >
        Вы - новый пользователь?
        <NavLink to="/register" className={cn(style.link, "pl-2")}>
          Зарегистрироваться
        </NavLink>
      </p>
      <p
        className={cn(
          "text text_type_main-default text_color_inactive",
          "mt-4"
        )}
      >
        Забыли пароль?
        <NavLink to="/forgot-password" className={cn(style.link, "pl-2")}>
          Восстановить пароль
        </NavLink>
      </p>
    </form>
  );
}

export default Login;
