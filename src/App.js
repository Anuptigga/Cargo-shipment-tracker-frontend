import{BrowserRouter as Router, Routes, Route} from "react-router"
import Home from "./pages/Home.js";
import Dashboard from "./pages/Dashboard";
import Shipment from "./pages/Shipment.js";
import ShipmentDetails from "./pages/ShipmentDetails.js";
import UpdateLocation from "./pages/UpdateLocation.js";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/shipments" element={<Dashboard/>} />
        <Route path="/shipment/:id" element={<ShipmentDetails />} />
        <Route path="/shipment" element={<Shipment/>} />
        <Route path="/shipment/:id/update-location" element={<UpdateLocation/>} />
      </Routes>
    </Router>
  );
}

export default App;
