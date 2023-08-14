// import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from "./components/NavBar/NavBar";
import { Banner } from "./components/banner/Banner";
import { TechStack } from "./components/tech/Tech";
import { Projects } from "./components/projects/Projects";
import { Contact } from "./components/contactUs/Contact";
import { Footer } from "./components/footer/Footer";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Banner />
      <TechStack />
      <Projects />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
