import {
  EmailInput,
  PasswordInput,
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./profile.module.css";
import cn from "classnames";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserInfoAction } from "../../../services/actions/user-actions/get-user-info-actions";
import NavProfile from "../nav-profile/nav-profile";
import Preloader from "../../../components/preloader/preloader";
import { updateUserInfoAction } from "../../../services/actions/user-actions/update-user-info-actions";
import { useForm } from "../../../hooks/useForm";
import { TRootState } from "../../../services/reducers/root-reducer";

export default function Profile() {
  const dispatch = useDispatch();
  const [isUserLoaded, setIsUserLoaded] = useState(false);
  useEffect(() => {
    dispatch(getUserInfoAction() as any).then(() => {
      setIsUserLoaded(true);
    });
  }, [dispatch]);
  const currentUserName: string = useSelector(
    (state: TRootState) => state.user.user.name
  );
  const currentUserEmail: string = useSelector(
    (state: TRootState) => state.user.user.email
  );
  const { values, handleChange, setValues, isChanged, setIsChanged } = useForm({
    name: currentUserName,
    email: currentUserEmail,
    password: "",
  });
  const [isDisabled, setIsDisabled] = useState(true);

  const saveChanges = () => {
    dispatch(
      updateUserInfoAction(values.name, values.email, values.password) as any
    ).then(() => {
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
  if (!isUserLoaded) {
    return <Preloader />;
  }

  return (
    <>
      <div className={cn(style.body__container)}>
        <NavProfile />
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
      </div>
    </>
  );
}
