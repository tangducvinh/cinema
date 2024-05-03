// import logo from "./logo.svg";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { publicRouters } from "./routers";
import { DefaultLayout } from "./component/Layout";
import { Fragment, useEffect } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

function App() {
  // useEffect(() => {
  //   fecth();
  // });

  const fecth = async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URl}/movie/list/showing`
    );
    return res.data;
  };
  const query = useQuery({ queryKey: ["ListShowingMovies"], queryFn: fecth });
  console.log("querry ", query);
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
        </Routes>
      </div>
    </Router>
  );
}

export default App;
