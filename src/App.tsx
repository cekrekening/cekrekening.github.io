import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import Cekrek from "./Cekrek";

export default function App() {
  return (
    <>
      <div className="container-flex flex flex-col justify-center h-screen overflow-hidden">
        <Header />
        <main className="flex-1 overflow-hidden 2xl:px-20 xl:px-20 lg:px-20 md:px-20 px-5">
          <div className="h-screen">
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Cekrek />}></Route>
              </Routes>
            </BrowserRouter>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
