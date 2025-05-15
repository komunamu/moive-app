import React from "react";
import { BrowserRouter as Router, 
  Routes,
  Route,
} from "react-router"; // User's existing import
import Home from "./routes/Home";
import Detail from "./routes/Detail";
import "./App.css"; // App.css import

function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}> {/* Add basename prop */}
      <div className="app-container"> {/* Main container div */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:id" element={<Detail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
