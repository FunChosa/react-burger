import {
  UPDATE_USER_INFO_REQUEST,
  UPDATE_USER_INFO_SUCCESS,
  UPDATE_USER_INFO_ERROR,
} from "../../../services/constants/user-constants/update-user-info-constants";
import { Dispatch } from "redux";
import { refreshToken, updateUserInfo } from "../../../utils/burger-api";
import { setCookie } from "../../../utils/cookie-handler";
import { IUserUpdateInfo } from "../../../utils/types";
export interface IUpdateUserInfoRequest {
  readonly type: typeof UPDATE_USER_INFO_REQUEST;
}
export interface IUpdateUserInfoSuccess {
  readonly type: typeof UPDATE_USER_INFO_SUCCESS;
  readonly user: {
    name: string;
    email: string;
  };
}
export interface IUpdateUserInfoError {
  readonly type: typeof UPDATE_USER_INFO_ERROR;
}

export type TUpdateUserInfoActions =
  | IUpdateUserInfoRequest
  | IUpdateUserInfoSuccess
  | IUpdateUserInfoError;

export const updateUserInfoRequest = (): IUpdateUserInfoRequest => ({
  type: UPDATE_USER_INFO_REQUEST,
});

export const updateUserInfoSuccess = (
  res: IUserUpdateInfo
): IUpdateUserInfoSuccess => ({
  type: UPDATE_USER_INFO_SUCCESS,
  user: res.user,
});

export const updateUserInfoError = (): IUpdateUserInfoError => ({
  type: UPDATE_USER_INFO_ERROR,
});

export const updateUserInfoAction = (
  name: string,
  email: string,
  password: string
) => {
  return async (dispatch: Dispatch<TUpdateUserInfoActions>) => {
    dispatch(updateUserInfoRequest());
    try {
      const res = await updateUserInfo({ name, email, password });
      if (res && res.success) {
        dispatch(updateUserInfoSuccess(res));
        console.log("UPDATE_USER_INFO_SUCCESS добавь типизацию", res);
      } else {
        dispatch(updateUserInfoError());
      }
    } catch (err: any) {
      if (err.message === "jwt expired" || err.message === "jwt malformed") {
        const res = await refreshToken();
        if (res && res.success) {
          setCookie("accessToken", res.accessToken.split("Bearer ")[1]);
          localStorage.setItem("refreshToken", res.refreshToken);
        }
      } else {
        dispatch(updateUserInfoError());
        console.log("UPDATE_USER_INFO_ERROR", err);
      }
    }
  };
};
