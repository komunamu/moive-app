import React from "react";
import { BrowserRouter as Router, 
  Routes,
  Route,
  

} from "react-router";
import Home from "./routes/Home";
import Detail from "./routes/Detail";

function App() {
  return (
  <Router>
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/movie/:id" element={<Detail />} />
      
    </Routes>
  </Router>);
  
}

export default App;
