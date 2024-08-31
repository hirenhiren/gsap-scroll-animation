import Slider from './components/Slider.jsx';
import Header from "./components/Header.jsx";
import Footer from './components/Footer.jsx';
import './style.css';


const App = () => {
  return (
    <div  className="App">
      <Header />
      <div className="containerDiv">
        <Slider/>
      </div>
      <Footer />
    </div>
  );
}

export default App;