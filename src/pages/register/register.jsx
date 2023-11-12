import {
  EmailInput,
  Button,
  PasswordInput,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./register.module.css";
import cn from "classnames";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { register } from "../../services/actions/user-actions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isRegisterSuccess = useSelector((state) => state.user.registerSuccess);
  const [registerInfo, setRegisterInfo] = useState({
    email: "",
    name: "",
    password: "",
  });

  const registerUser = (e) => {
    e.preventDefault();
    dispatch(register({ ...registerInfo }));
  };

  useEffect(() => {
    if (isRegisterSuccess) {
      navigate("/login", { replace: true });
    }
  });
  const handleInputChange = (field, value) => {
    setRegisterInfo((prevInfo) => ({
      ...prevInfo,
      [field]: value,
    }));
  };

  return (
    <form className={cn(style.container, "mt-20")} onSubmit={registerUser}>
      <p className={cn("text text_type_main-medium", "mb-6")}>Регистрация</p>
      <div className={cn("mb-6")}>
        <Input
          placeholder="Имя"
          onChange={(e) => handleInputChange("name", e.target.value)}
          value={registerInfo.name}
        />
      </div>
      <div className={cn("mb-6")}>
        <EmailInput
          placeholder="Укажите e-mail"
          onChange={(e) => handleInputChange("email", e.target.value)}
          value={registerInfo.email}
        />
      </div>
      <div className={cn("mb-6")}>
        <PasswordInput
          onChange={(e) => handleInputChange("password", e.target.value)}
          value={registerInfo.password}
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
        <NavLink to="/login" className={cn(style.link, "pl-2")}>
          Войти
        </NavLink>
      </p>
    </form>
  );
}

export default Register;
