import "./App.css";
import Footer from "./components/layout/Footer";
import Navbar from "./components/layout/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <div
        className="min-h-screen text-white flex items-center justify-center"
        style={{ backgroundColor: "rgba(9, 9, 15, 1)" }}
      ></div>
      <Footer />
    </>
  );
}

export default App;
