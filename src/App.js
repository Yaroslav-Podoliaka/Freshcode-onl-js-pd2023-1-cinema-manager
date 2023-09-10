import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./components/HomePage";
import Movies from "./components/Movies/Movies";
import Actors from "./components/Actors/Actors";
import Directors from "./components/Directors/Directors";
import Studios from "./components/Studios/Studios";
import ErrorPage from "./components/ErrorPage";
import "./App.css";

function App() {
  return (
    <Router className="container">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="movies/*" element={<Movies />} />
          <Route path="actors/*" element={<Actors />} />
          <Route path="directors/*" element={<Directors />} />
          <Route path="studios/*" element={<Studios />} />
          <Route path="error" element={<ErrorPage />} />
          <Route path="*" element={<Navigate to="/error" replace />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
