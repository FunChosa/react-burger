import { TForgotPasswordActions } from "./forgot-password-actions";
import { TGetUserInfoActions } from "./get-user-info-actions";
import { TLoginUserActions } from "./login-user-actions";
import { TLogoutUserActions } from "./logout-user-actions";
import { TRegisterUserActions } from "./register-user-actions";
import { TResetPasswordActions } from "./reset-password-actions";
import { TUpdateUserInfoActions } from "./update-user-info-actions";

export type TUserActions =
  | TForgotPasswordActions
  | TGetUserInfoActions
  | TLoginUserActions
  | TLogoutUserActions
  | TRegisterUserActions
  | TResetPasswordActions
  | TUpdateUserInfoActions;
