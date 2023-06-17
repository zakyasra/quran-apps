import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import HomeDetails from "./pages/homeDetails";
import "./style/style.scss";
import { useEffect, useState } from "react";
import Header from "./components/Header";
import { Helmet } from "react-helmet";

function App() {
  const [mode, setMode] = useState("dark");
  // Add extra component
  // const NavRoute = ({ exact, path, component: Component }) => (
  //   <Route
  //     exact={exact}
  //     path={path}
  //     render={(props) => (
  //       <div>
  //         <Header mode={mode} setMode={setMode} />
  //         <Component {...props} />
  //       </div>
  //     )}
  //   />
  // );

  useEffect(() => {
    const modes = localStorage.getItem("mode");
    if (modes) {
      setMode(modes);
    }
  }, []);

  return (
    <div className={`${mode}-mode`}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>QuranApp</title>
        <link
          rel="icon"
          href="https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.detik.com%2Fedu%2Fdetikpedia%2Fd-6470111%2Fsejarah-macam-macam-bola-di-ajang-piala-dunia-tahun-2022-paling-canggih&psig=AOvVaw3dhqcBj49Qx9FtRwhtwxIz&ust=1687084269898000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCJD92OeMyv8CFQAAAAAdAAAAABAE"
        />
      </Helmet>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header mode={mode} setMode={setMode} />
                <Home mode={mode} />
              </>
            }
          />
          <Route path="/:id" element={<HomeDetails mode={mode} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
