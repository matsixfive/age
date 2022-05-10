import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import devTools from "devtools-detect";

import Header from "./headfoot/Header";
import Footer from "./headfoot/Footer";
import Joke from "./pages/Joke";

export default function App() {
  //* Check if devtools are open (useless)
  useEffect(() => {
    if (devTools.isOpen) {
      console.log("Hello developer :)");
    }
    window.addEventListener("devtoolschange", (event) => {
      if (event.detail.isOpen) {
        console.log("Hello developer :)");
      }
    });
  }, []);


  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* All base level pages */}
          <Route index element={<Header />} />
          <Route path="foot" element={<Footer />} />
          <Route path="joke" element={<Joke />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
