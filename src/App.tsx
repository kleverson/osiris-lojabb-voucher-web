import { Route, Routes } from "react-router-dom";
import Voucher from "./pages/voucher";
import Rescue from "./pages/rescue";
import Success from "./pages/success";
import Status from "./pages/status";
import Home from "./pages/home";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/:code" element={<Voucher />}></Route>
      <Route path="/:code/rescue" element={<Rescue />} />
      <Route path="/:code/success" element={<Success />} />
      <Route path="/:code/status" element={<Status />} />
    </Routes>
  );
}

export default App;
