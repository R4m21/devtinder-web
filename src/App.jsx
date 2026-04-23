import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./NavBar";
import Layout from "./Layout";
import Login from "./Login";
import Profile from "./Profile";
import { Provider } from "react-redux";
import store from "./redux/store";

function App() {
  return (
    <>
      <Provider store={store}>
        <NavBar />
        <BrowserRouter basename={"/"}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="/login" element={<Login />} />
              <Route path="/profile" element={<Profile />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
