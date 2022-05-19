import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import devTools from "devtools-detect";

import Header from "./headfoot/Header";
import Footer from "./headfoot/Footer";

import PageNotFound from "./pages/404/PageNotFound";

import Homepage from "./pages/homepage/Homepage";
import Joke from "./pages/Joke";
import IP from "./pages/IP";

export default function App() {
  //* Check if devtools are open (useless)
  const devT = () => {
    console.log("Hello developer :)");
  };
  useEffect(() => {
    if (devTools.isOpen) {
      devT();
    }
    window.addEventListener("devtoolschange", (event) => {
      if (event.detail.isOpen) {
        devT();
      }
    });
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* All base level pages */}
          <Route index element={<Homepage />} />
          <Route path="head" element={<Header />} />
          <Route path="foot" element={<Footer />} />
          <Route path="joke" element={<Joke />} />
          <Route path="ip" element={<IP />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
