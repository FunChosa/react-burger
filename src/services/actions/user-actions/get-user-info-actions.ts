import { AppDispatch } from "../../..";
import {
  GET_USER_INFO_REQUEST,
  GET_USER_INFO_SUCCESS,
  GET_USER_INFO_ERROR,
} from "../../../services/constants/user-constants/get-user-info-constants";
import { getUserInfo, refreshToken } from "../../../utils/burger-api";
import { setCookie } from "../../../utils/cookie-handler";
import { IUserGetInfo } from "../../../utils/types";
export interface IGetUserInfoRequest {
  readonly type: typeof GET_USER_INFO_REQUEST;
}
export interface IGetUserInfoSuccess {
  readonly type: typeof GET_USER_INFO_SUCCESS;
  readonly data: IUserGetInfo;
}
export interface IGetUserInfoError {
  readonly type: typeof GET_USER_INFO_ERROR;
}

export type TGetUserInfoActions =
  | IGetUserInfoRequest
  | IGetUserInfoSuccess
  | IGetUserInfoError;

export const getUserInfoRequest = (): IGetUserInfoRequest => ({
  type: GET_USER_INFO_REQUEST,
});
export const getUserInfoSuccess = (res: IUserGetInfo): IGetUserInfoSuccess => ({
  type: GET_USER_INFO_SUCCESS,
  data: res,
});
export const getUserInfoError = (): IGetUserInfoError => ({
  type: GET_USER_INFO_ERROR,
});

export const getUserInfoAction = () => async (dispatch: AppDispatch) => {
  dispatch(getUserInfoRequest());
  try {
    const res = await getUserInfo();
    if (res && res.success) {
      dispatch(getUserInfoSuccess(res));
    } else {
      dispatch(getUserInfoError());
    }
  } catch (err: Error | any) {
    if (err.message === "jwt expired" || err.message === "jwt malformed") {
      const res = await refreshToken();
      if (res && res.success) {
        setCookie("accessToken", res.accessToken.split("Bearer ")[1]);
        localStorage.setItem("refreshToken", res.refreshToken);
      }
    } else {
      dispatch(getUserInfoError());
      console.log("GET_USER_INFO_ERROR", err);
    }
  }
};
