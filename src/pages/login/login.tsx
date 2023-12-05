import {
  EmailInput,
  Button,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./login.module.css";
import cn from "classnames";
import { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { login } from "../../services/actions/user-actions";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { paths } from "../../utils/paths";
import { useForm } from "../../hooks/useForm";
function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const isLoginSuccess = useSelector((state: any) => {
    return state.user.loginSuccess;
  });

  const { values, handleChange } = useForm({
    email: "",
    password: "",
  });

  const loginForm = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    dispatch(login({ ...values } as any) as any).then(() => {});
  };

  useEffect(() => {
    if (isLoginSuccess) {
      const { from } = location.state || { from: { pathname: "/" } };
      navigate(from, { replace: true });
    }
  }, [isLoginSuccess, location.state, navigate]);

  return (
    <form className={cn(style.container, "mt-20")} onSubmit={loginForm}>
      <p className={cn("text text_type_main-medium", "mb-6")}>Вход</p>
      <div className={cn("mb-6")}>
        <EmailInput
          placeholder="Укажите e-mail"
          onChange={(e) => handleChange(e)}
          // @ts-ignores
          value={values.email}
          name="email"
        />
      </div>
      <div className={cn("mb-6")}>
        <PasswordInput
          onChange={(e) => handleChange(e)}
          // @ts-ignores
          value={values.password}
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
        <NavLink to={paths.register} className={cn(style.link, "pl-2")}>
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
        <NavLink to={paths.forgotPassword} className={cn(style.link, "pl-2")}>
          Восстановить пароль
        </NavLink>
      </p>
    </form>
  );
}

export default Login;
