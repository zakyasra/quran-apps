import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import HomeDetails from "./pages/homeDetails";
import "./style/style.scss";
import { useEffect, useState } from "react";
import Header from "./components/Header";

function App() {
  const [mode, setMode] = useState("dark");
  // Add extra component
  const NavRoute = ({ exact, path, component: Component }) => (
    <Route
      exact={exact}
      path={path}
      render={(props) => (
        <div>
          <Header mode={mode} setMode={setMode} />
          <Component {...props} />
        </div>
      )}
    />
  );

  useEffect(() => {
    const modes = localStorage.getItem("mode");
    if (modes) {
      setMode(modes);
    }
  }, []);

  return (
    <div className={`${mode}-mode`}>
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
