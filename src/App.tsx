import "./App.css";
import Footer from "./layout/Footer";
import Cekrek from "./Cekrek";
import Trakteer from "./layout/Trakteer";

export default function App() {
  return (
    <>
      <div className="container-flex flex flex-col justify-center h-screen overflow-hidden">
        <main className="flex-1 overflow-hidden 2xl:px-20 xl:px-20 lg:px-20 md:px-20 px-10 py-16">
          <div className="h-screen">
            <Cekrek />
            <Trakteer />
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
