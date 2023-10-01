import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cekrek from "./Cekrek";

export default function App() {
  return (
    <>
      <div className="container-flex flex flex-col justify-center h-screen overflow-hidden">
        <header className="w-full text-center py-20"></header>
        <main className="flex-1 overflow-hidden 2xl:px-20 xl:px-20 lg:px-20 md:px-20 px-5">
          <div className="min-h-screen">
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Cekrek />}></Route>
              </Routes>
            </BrowserRouter>
          </div>
        </main>
        <footer className="footer footer-center p-5 bg-base text-base-content">
          <aside>
            <p>Made with ❤️ in Surabaya</p>
            <p>@heirro</p>
          </aside>
        </footer>
      </div>
    </>
  );
}
