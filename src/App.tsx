import "./App.css";
import Body from "./components/Body";
import Footer from "./components/Footer";
import Header from "./components/Header";

function App() {
  return (
    <div className="bg-bg-color w-screen h-screen flex justify-center">
      <div className="w-2/3 mx-auto flex flex-col justify-between items-center">
        <Header />
        <Body />
        <Footer />
      </div>
    </div>
  );
}

export default App;
