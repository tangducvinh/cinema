// import logo from "./logo.svg";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { publicRouters } from "./routers";
import { DefaultLayout } from "./component/Layout";
import { Fragment, useEffect } from "react";

import ManagerLayout from "./component/Layout/ManagerLayout";
import {
  ManagerAccount,
  ManagerMovie,
  ManagerShow,
  ManagerRoom,
  ManagerBill,
  Dashboard,
} from "./pages/Manager";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {publicRouters.map((route, index) => {
            const Page = route.component;
            let Layout = DefaultLayout;
            if (route.layout) {
              Layout = route.layout;
            } else if (route.layout === null) {
              Layout = Fragment;
            }
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              />
            );
          })}

          <Route path="manager" element={<ManagerLayout />}>
            <Route path="movie" element={<ManagerMovie />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="show" element={<ManagerShow />} />
            <Route path="account" element={<ManagerAccount />} />
            <Route path="room" element={<ManagerRoom />} />
            <Route path="bill" element={<ManagerBill />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
