import Main from "../../pages/main/main";
import AppHeader from "../app-header/app-header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NotFound from "../../pages/not-found/not-found";
import Login from "../../pages/login/login";
import ForgotPassword from "../../pages/forgot-password/forgot-password";
import ResetPassword from "../../pages/reset-password/reset-password";
import Register from "../../pages/register/register";
import IngredientDetails from "../ingredient-details/ingredient-details";
import Modal from "../../components/modal/modal";
import Feed from "../../pages/feed/feed";
import { useLocation } from "react-router-dom";
import { useEffect, useCallback } from "react";
import { getData } from "../../services/actions/all-ingredients-actions";
import ProtectedRouteElement from "../protected-route-element/protected-route-element";
import { paths } from "../../utils/paths";
import { useNavigate } from "react-router-dom";
import Profile from "../../pages/profile/profile/profile";
import ProfileOrders from "../../pages/profile/profile-orders/profile-orders";

import OrderDetails from "../order-details/order-details";
import { useAppDispatch } from "../../hooks/useSelector-useDispatch";
function App() {
  const ModalSwitch = () => {
    const dispatch = useAppDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const background = location.state && location.state.background;

    useEffect(() => {
      dispatch(getData() as any);
    }, [dispatch]);

    const handleModalClose = useCallback(() => {
      navigate(-1);
    }, [navigate]);

    return (
      <>
        <AppHeader />
        <Routes location={background || location}>
          <Route path={paths.main} element={<Main />} />
          <Route path={paths.ingredients} element={<IngredientDetails />} />
          <Route path={paths.feedDetails} element={<OrderDetails />} />
          <Route
            path={paths.login}
            element={
              <ProtectedRouteElement
                element={<Login />}
                protectedFromAuthorizedUser
              />
            }
          />
          <Route
            path={paths.register}
            element={
              <ProtectedRouteElement
                element={<Register />}
                protectedFromAuthorizedUser
              />
            }
          />
          <Route
            path={paths.forgotPassword}
            element={
              <ProtectedRouteElement
                element={<ForgotPassword />}
                protectedFromAuthorizedUser
              />
            }
          />
          <Route
            path={paths.resetPassword}
            element={
              <ProtectedRouteElement
                element={<ResetPassword />}
                protectedFromAuthorizedUser
              />
            }
          />
          <Route
            path={paths.profile}
            element={<ProtectedRouteElement element={<Profile />} />}
          />
          <Route
            path={paths.profileOrders}
            element={<ProtectedRouteElement element={<ProfileOrders />} />}
          />
          <Route
            path={paths.orderDetails}
            element={<ProtectedRouteElement element={<OrderDetails />} />}
          />
          <Route path={paths.feed} element={<Feed />} />
          <Route path="*" element={<NotFound />} /> {/* 404 */}
        </Routes>
        {background && (
          <Routes>
            <Route
              path={paths.ingredients}
              element={
                <Modal title="Детали ингредиента" onClose={handleModalClose}>
                  <IngredientDetails />
                </Modal>
              }
            />
            <Route
              path={paths.feedDetails}
              element={
                <Modal onClose={handleModalClose}>
                  <OrderDetails />
                </Modal>
              }
            />
            <Route
              path={paths.orderDetails}
              element={
                <Modal onClose={handleModalClose}>
                  <OrderDetails />
                </Modal>
              }
            />
          </Routes>
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
