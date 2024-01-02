import {
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_ERROR,
} from "../../../services/constants/user-constants/forgot-password-constants";
import { Dispatch } from "redux";
import { forgotPassword } from "../../../utils/burger-api";

export interface IForgotPasswordRequest {
  readonly type: typeof FORGOT_PASSWORD_REQUEST;
}
export interface IForgotPasswordSuccess {
  readonly type: typeof FORGOT_PASSWORD_SUCCESS;
}
export interface IForgotPasswordError {
  readonly type: typeof FORGOT_PASSWORD_ERROR;
}

export type TForgotPasswordActions =
  | IForgotPasswordRequest
  | IForgotPasswordSuccess
  | IForgotPasswordError;

export const forgotPasswordRequest = (): IForgotPasswordRequest => ({
  type: FORGOT_PASSWORD_REQUEST,
});

export const forgotPasswordSuccess = (): IForgotPasswordSuccess => ({
  type: FORGOT_PASSWORD_SUCCESS,
});

export const forgotPasswordError = (): IForgotPasswordError => ({
  type: FORGOT_PASSWORD_ERROR,
});

export const forgotPasswordAction =
  (data: { valueEmail: string }) =>
  async (dispatch: Dispatch<TForgotPasswordActions>) => {
    dispatch(forgotPasswordRequest());
    try {
      const res = await forgotPassword(data);
      if (res && res.success) {
        dispatch(forgotPasswordSuccess());
      } else {
        dispatch(forgotPasswordError());
      }
    } catch (err) {
      dispatch(forgotPasswordError());
      console.log("FORGOT_PASSWORD_ERROR", err);
    }
  };
