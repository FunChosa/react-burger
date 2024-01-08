import {
  Input,
  Button,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./reset-password.module.css";
import cn from "classnames";
import { useEffect } from "react";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import { resetPasswordAction } from "../../services/actions/user-actions/reset-password-actions";
import { paths } from "../../utils/paths";
import { useForm } from "../../hooks/useForm";
import {
  useAppDispatch,
  useAppSelector,
} from "../../hooks/useSelector-useDispatch";

function ResetPassword() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isResetPasswordSuccess: boolean = useAppSelector(
    (state) => state.user.resetPasswordSuccess
  );
  const { values, handleChange } = useForm({
    password: "",
    resetToken: "",
  });
  const resetPassword = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    dispatch(
      resetPasswordAction({
        password: values.password,
        resetToken: values.resetToken,
      }) as any
    );
  };
  useEffect(() => {
    if (isResetPasswordSuccess) {
      localStorage.removeItem("forgotPasswordEmail");
      navigate("/login", { replace: true });
    }
  });

  if (localStorage.getItem("forgotPasswordEmail") === null) {
    return <Navigate to={paths.forgotPassword} />;
  }

  return (
    <form className={cn(style.container, "mt-20")} onSubmit={resetPassword}>
      <p className={cn("text text_type_main-medium", "mb-6")}>
        Восстановление пароля
      </p>
      <div className={cn("mb-6")}>
        <PasswordInput
          onChange={(e) => handleChange(e)}
          value={values.password}
          name="password"
          placeholder="Введите новый пароль"
        />
      </div>
      <div className={cn("mb-6")}>
        <Input
          placeholder="Введите код из письма"
          onChange={(e) => handleChange(e)}
          value={values.resetToken}
          name="resetToken"
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
        <NavLink to={paths.login} className={cn(style.link, "pl-2")}>
          Войти
        </NavLink>
      </p>
    </form>
  );
}
export default ResetPassword;
