import './App.css';
import { Content } from './components/content/Content';
//import { Footer } from './components/footer/Footer';
import Footer from './components/footer/Footer'
import {Header} from './components/header/Header'
import { Sidebar } from './components/sidebar/Sidebar';

function App() {
  return (
    <div className="App">
      Hola
      <Header/>
      <Sidebar/>
      <Content/>
      <Footer/>
    </div>
  );
}

export default App;
