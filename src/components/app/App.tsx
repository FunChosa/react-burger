import Main from "../../pages/main/main";
import AppHeader from "../app-header/app-header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NotFound from "../../pages/not-found/not-found";
import Profile from "../../pages/profile/profile";
import Login from "../../pages/login/login";
import ForgotPassword from "../../pages/forgot-password/forgot-password";
import ResetPassword from "../../pages/reset-password/reset-password";
import Register from "../../pages/register/register";
import OrderDetails from "../order-details/order-details";
import IngredientDetails from "../ingredient-details/ingredient-details";
import Modal from "../../components/modal/modal";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { getData } from "../../services/actions/all-ingredients-actions";
import { useDispatch } from "react-redux";
import ProtectedRouteElement from "../protected-route-element/protected-route-element";
function App() {
  const ModalSwitch = () => {
    const dispatch = useDispatch();
    useEffect(() => {
      // @ts-ignore
      dispatch(getData());
    });
    const location = useLocation();
    let background = location.state && location.state.background;

    return (
      <>
        <AppHeader />
        <Routes location={background || location}>
          <Route path="/" element={<Main />} />
          <Route
            path="ingredients/:ingredientId"
            element={<IngredientDetails />}
          />
          <Route
            path="/login"
            element={
              <ProtectedRouteElement
                element={<Login />}
                protectedFromAuthorizedUser
              />
            }
          />
          <Route
            path="/register"
            element={
              <ProtectedRouteElement
                element={<Register />}
                protectedFromAuthorizedUser
              />
            }
          />
          <Route
            path="/forgot-password"
            element={
              <ProtectedRouteElement
                element={<ForgotPassword />}
                protectedFromAuthorizedUser
              />
            }
          />
          <Route
            path="/reset-password"
            element={
              <ProtectedRouteElement
                element={<ResetPassword />}
                protectedFromAuthorizedUser
              />
            }
          />
          <Route
            path="profile"
            // @ts-ignore
            element={<ProtectedRouteElement element={<Profile />} />}
          />
          <Route
            path="/profile/orders/:orderNumber"
            element={<ProtectedRouteElement element={<OrderDetails />} />}
          />
          <Route path="*" element={<NotFound />} /> {/* 404 */}
        </Routes>
        {background && (
          <Route
            path="/ingredients/:ingredientId"
            element={<Modal title="Детали ингредиента" />}
          />
        )}
        {background && (
          <Route
            path="/profile/orders/:orderNumber"
            element={<Modal title="Детали заказа" />}
          />
        )}
      </>
    );
  };

  return (
    <Router>
      <ModalSwitch />
    </Router>
  );
}

export default App;
