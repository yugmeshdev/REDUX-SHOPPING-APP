import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import "./App.css";
import Auth from "./components/Auth";
import Layout from "./components/Layout";
import { fetchData, sendCartData } from "./store/cart-slice";
import Notification from "./components/Notification";
import { uiActions } from "./store/ui-slice";
let isFirstRender = true;
function App() {
  const dispatch = useDispatch();
  const notification = useSelector((state) => state.ui.notification);
  //this cart state is WHOLE STAte of cart-slice
  const cart = useSelector((state) => state.cart);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  console.log(isLoggedIn);
  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);
  useEffect(() => {
    if (isFirstRender) {
      isFirstRender = false;
      return;
    }

    if (cart.changed) {
      dispatch(sendCartData(cart));
    }
  }, [cart, dispatch]);

  return (
    <div className="App">
      {notification && (
        <Notification type={notification.type} message={notification.message} />
      )}
      {!isLoggedIn ? <Auth /> : <Layout />}
      {/* {!isLoggedIn &&<Auth />} 
      {isLoggedIn &&<Layout />} */}
    </div>
  );
}

export default App;
