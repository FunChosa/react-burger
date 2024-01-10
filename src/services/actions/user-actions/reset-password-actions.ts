import {
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_ERROR,
} from "../../constants/user-constants/reset-password-constants";
import { resetPassword } from "../../../utils/burger-api";
import { AppDispatch } from "../../..";

export interface IResetPasswordRequest {
  readonly type: typeof RESET_PASSWORD_REQUEST;
}

export interface IResetPasswordSuccess {
  readonly type: typeof RESET_PASSWORD_SUCCESS;
}
export interface IResetPasswordError {
  readonly type: typeof RESET_PASSWORD_ERROR;
}

export type TResetPasswordActions =
  | IResetPasswordRequest
  | IResetPasswordSuccess
  | IResetPasswordError;

export const resetPasswordRequest = (): IResetPasswordRequest => ({
  type: RESET_PASSWORD_REQUEST,
});

export const resetPasswordSuccess = (): IResetPasswordSuccess => ({
  type: RESET_PASSWORD_SUCCESS,
});

export const resetPasswordError = (): IResetPasswordError => ({
  type: RESET_PASSWORD_ERROR,
});

export const resetPasswordAction = (data: {
  password: string;
  resetToken: string;
}) => {
  return async (dispatch: AppDispatch) => {
    dispatch(resetPasswordRequest());
    try {
      const res = await resetPassword(data);
      if (res && res.success) {
        dispatch(resetPasswordSuccess());
      } else {
        dispatch(resetPasswordError());
      }
    } catch (err) {
      dispatch(resetPasswordError());
      // console.log("RESET_PASSWORD_ERROR", err);
    }
  };
};
