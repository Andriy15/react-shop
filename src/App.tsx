import { Route, Routes } from "react-router-dom";
import { ProductPages } from "./pages/ProductPages";
import { AboutPage } from "./pages/AboutPage";
import { Navigation } from "./components/Navigation";

function App() {

  // function toggleCurrency() {
  //   setCurrency((prevCurrency) => (prevCurrency === "usd" ? "uah" : "usd"));
  // }

  return (
     <>
       <Navigation  />
       <Routes>
         <Route path="/" element={<ProductPages />} />
         <Route path="/about" element={<AboutPage />} />
       </Routes>
     </>
  );
}

export default App;
