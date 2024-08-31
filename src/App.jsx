import Slider from './components/Slider';
import Header from './components/Header';
import Footer from './components/Footer';
import './style.css';


const App = () => {
  return (
    <div className="App">
      <Header />
      <div className="containerDiv">
        <Slider/>
      </div>
      <Footer />
    </div>
  );
}

export default App;