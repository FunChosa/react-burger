import {
  EmailInput,
  PasswordInput,
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./profile.module.css";
import cn from "classnames";
import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  logout,
  getUserInfoRequest,
  updateUserInfoRequest,
} from "../../services/actions/user-actions";
import { paths } from "../../utils/paths";
import { useForm } from "../../hooks/useForm";

function Profile() {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const currentUserName: string = useSelector(
    (state: any) => state.user.user.name
  );
  const currentUserEmail: string = useSelector(
    (state: any) => state.user.user.email
  );
  const { values, handleChange, setValues, isChanged, setIsChanged } = useForm({
    name: currentUserName,
    email: currentUserEmail,
    password: "",
  });
  const [isDisabled, setIsDisabled] = useState(true);
  const [isUserLoaded, setIsUserLoaded] = useState(false);

  useEffect(() => {
    dispatch(getUserInfoRequest() as any).then(() => {
      setIsUserLoaded(true);
    });
  }, [dispatch]);
  const saveChanges = () => {
    dispatch(updateUserInfoRequest({ ...values } as any) as any).then(() => {
      setIsChanged(false);
    });
  };
  useEffect(() => {
    setValues({
      name: currentUserName,
      email: currentUserEmail,
      password: "",
    });
    setIsChanged(false);
  }, [currentUserName, currentUserEmail, setValues, setIsChanged]);
  const resetChanges = () => {
    setValues({
      name: currentUserName,
      email: currentUserEmail,
      password: "",
    });
    setIsChanged(false);
  };
  const logoutRequest = () => {
    dispatch(logout() as any);
  };

  return isUserLoaded ? (
    <section className={cn(style.section, "mt-20")}>
      <div className={cn(style.navigation, "mt-20")}>
        <NavLink
          className={({ isActive }) =>
            isActive ? cn("mb-6", style.active) : cn("mb-6", style.link)
          }
          to={paths.profile}
        >
          <p
            className={cn(
              `text text_type_main-medium text_color_${
                pathname === "/profile" ? "primary" : "inactive"
              }`
            )}
          >
            Профиль
          </p>
        </NavLink>
        <NavLink
          to={paths.orders}
          className={({ isActive }) =>
            isActive ? cn("mb-6", style.active) : cn("mb-6", style.link)
          }
        >
          <p
            className={cn(
              `text text_type_main-medium text_color_${
                pathname === "/profile/orders" ? "primary" : "inactive"
              }`
            )}
          >
            История заказов
          </p>
        </NavLink>
        <NavLink
          to={paths.login}
          className={({ isActive }) =>
            isActive ? cn("mb-6", style.active) : cn("mb-6", style.link)
          }
        >
          <p
            className={cn(
              `text text_type_main-medium text_color_${
                pathname === "/exit" ? "primary" : "inactive"
              }`
            )}
            onClick={logoutRequest}
          >
            Выход
          </p>
        </NavLink>
        <p
          className={cn(
            "text text_type_main-default text_color_inactive",
            "mt-30"
          )}
        >
          В этом разделе вы можете <br />
          изменить свои персональные данные
        </p>
      </div>
      <div className={cn(style.inputs_container)}>
        <div className={cn("mb-6")}>
          <Input
            placeholder="Имя"
            onChange={(e) => {
              handleChange(e);
            }}
            value={values.name}
            icon="EditIcon"
            name={"name"}
            disabled={isDisabled}
            onIconClick={() => {
              setIsDisabled(false);
            }}
          />
        </div>
        <div className={cn("mb-6")}>
          <EmailInput
            placeholder="Логин"
            onChange={(e) => {
              handleChange(e);
            }}
            name={"email"}
            value={values.email}
            isIcon={true}
          />
        </div>
        <div className={cn("mb-6")}>
          <PasswordInput
            onChange={(e) => {
              handleChange(e);
            }}
            value={values.password}
            name={"password"}
            icon="EditIcon"
          />
        </div>
        <div
          className={cn(style.buttons)}
          style={isChanged ? { display: "flex" } : { display: "none" }}
        >
          <Button htmlType="submit" type="secondary" onClick={resetChanges}>
            Отменить
          </Button>
          <Button htmlType="submit" type="primary" onClick={saveChanges}>
            Сохранить
          </Button>
        </div>
      </div>
    </section>
  ) : (
    <></>
  );
}

export default Profile;
