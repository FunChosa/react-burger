import {
  LOGOUT_USER_REQUEST,
  LOGOUT_USER_SUCCESS,
  LOGOUT_USER_ERROR,
} from "../../../services/constants/user-constants/logout-user-constants";
import { Dispatch } from "redux";
import { logoutUser } from "../../../utils/burger-api";
import { deleteCookie } from "../../../utils/cookie-handler";

export interface ILogoutUserRequest {
  readonly type: typeof LOGOUT_USER_REQUEST;
}

export interface ILogoutUserSuccess {
  readonly type: typeof LOGOUT_USER_SUCCESS;
}

export interface ILogoutUserError {
  readonly type: typeof LOGOUT_USER_ERROR;
}

export type TLogoutUserActions =
  | ILogoutUserRequest
  | ILogoutUserSuccess
  | ILogoutUserError;

export const logoutUserRequest = (): ILogoutUserRequest => ({
  type: LOGOUT_USER_REQUEST,
});

export const logoutUserSuccess = (): ILogoutUserSuccess => ({
  type: LOGOUT_USER_SUCCESS,
});

export const logoutUserError = (): ILogoutUserError => ({
  type: LOGOUT_USER_ERROR,
});

export const logoutUserAction = () => {
  return async (dispatch: Dispatch<TLogoutUserActions>) => {
    dispatch(logoutUserRequest());
    try {
      const res = await logoutUser();
      if (res && res.success) {
        deleteCookie("accessToken");
        dispatch(logoutUserSuccess());
        localStorage.removeItem("refreshToken");
      } else {
        dispatch(logoutUserError());
      }
    } catch (err) {
      dispatch(logoutUserError());
      console.log("LOGOUT_USER_ERROR", err);
    }
  };
};
