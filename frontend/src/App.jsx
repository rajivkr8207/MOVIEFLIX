import { Provider } from "react-redux";
import AppRouter from "./router";
import { store } from "./stores/store";
import { ToastContainer } from "react-toastify";

const App = () => {

  return (
    <Provider store={store}>
      <AppRouter />
      <ToastContainer />
    </Provider>
  );
};

export default App;
