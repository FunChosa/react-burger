export interface IIngredientType {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
  key?: string;
}
export interface IOrder {
  name: string;
  order: {
    number: number;
  };
  success: boolean;
}
export interface IIngredients {
  success: boolean;
  data: IIngredientType[];
}
export interface IForgotPassword {
  success: boolean;
  message: string;
}
export interface IResetPassword {
  success: boolean;
  message: string;
}
export interface IRegisterUser {
  success: boolean;
  user: {
    email: string;
    name: string;
  };
  accessToken: string;
  refreshToken: string;
}
export interface ILoginUser {
  success: boolean;
  user: {
    email: string;
    name: string;
  };
  accessToken: string;
  refreshToken: string;
}
export interface ILogoutUser {
  success: boolean;
  message: string;
}
export interface IRefreshToken {
  success: boolean;
  accessToken: string;
  refreshToken: string;
}
export interface IUserGetInfo {
  success: boolean;
  user: {
    email: string;
    name: string;
  };
}
export interface IUserUpdateInfo {
  success: boolean;
  user: {
    email: string;
    name: string;
  };
}
