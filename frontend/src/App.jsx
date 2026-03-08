import { Provider } from "react-redux";
import AppRouter from "./router";
import { store } from "./stores/store";
import { ToastContainer } from "react-toastify";
import ScrollToTop from "./utils/ScrollToTop";

const App = () => {

  return (
    <Provider store={store}>
      <AppRouter />
      <ToastContainer />
    </Provider>
  );
};

export default App;
