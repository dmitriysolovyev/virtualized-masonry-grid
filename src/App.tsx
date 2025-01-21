import { Suspense } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import MainRoutes from "./pages/Routes";

const App = () => {
  return (
    <Suspense>
      <Router>
        <MainRoutes />
      </Router>
    </Suspense>
  );
};

export default App;
