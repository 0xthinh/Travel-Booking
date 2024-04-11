import { BrowserRouter, Routes, Route } from "react-router-dom";

import store from "./util/store";
import { Provider } from "react-redux";
import Admin from "./pages/Admin/Admin";
import AdminList from "./components/admin/AdminList";
import AdminNewHotel from "./components/admin/AdminNewHotel";
import AdminNewRoom from "./components/admin/AdminNewRoom";
import NotFound from "./NotFound";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/admin/add/hotel" element={<AdminNewHotel />} />
          <Route path="/admin/add/room" element={<AdminNewRoom />} />
          <Route path="/admin/:list" element={<AdminList />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
