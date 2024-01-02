import {
  EmailInput,
  Button,
  PasswordInput,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./register.module.css";
import cn from "classnames";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { registerUserAction } from "../../services/actions/user-actions/register-user-actions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { paths } from "../../utils/paths";
import { useForm } from "../../hooks/useForm";
import { TRootState } from "../../services/reducers/root-reducer";

function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isRegisterSuccess: boolean = useSelector(
    (state: TRootState) => state.user.registerSuccess
  );
  const { values, handleChange } = useForm({
    email: "",
    name: "",
    password: "",
  });

  const registerUser = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    dispatch(
      registerUserAction(values.email, values.name, values.password) as any
    );
  };

  useEffect(() => {
    if (isRegisterSuccess) {
      navigate("/login", { replace: true });
    }
  });

  return (
    <form className={cn(style.container, "mt-20")} onSubmit={registerUser}>
      <p className={cn("text text_type_main-medium", "mb-6")}>Регистрация</p>
      <div className={cn("mb-6")}>
        <Input
          placeholder="Имя"
          onChange={(e) => handleChange(e)}
          value={values.name}
          name="name"
        />
      </div>
      <div className={cn("mb-6")}>
        <EmailInput
          placeholder="Укажите e-mail"
          onChange={(e) => handleChange(e)}
          value={values.email}
          name="email"
        />
      </div>
      <div className={cn("mb-6")}>
        <PasswordInput
          onChange={(e) => handleChange(e)}
          value={values.password}
          name="password"
        />
      </div>
      <Button htmlType="submit">Зарегистрироваться</Button>
      <p
        className={cn(
          "text text_type_main-default text_color_inactive",
          "mt-20"
        )}
      >
        Уже зарегистрированы?
        <NavLink to={paths.login} className={cn(style.link, "pl-2")}>
          Войти
        </NavLink>
      </p>
    </form>
  );
}

export default Register;
