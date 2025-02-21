import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from './components/pages/home';
import Footer from './components/utils/footer';
import Header from './components/utils/header';

function App() {
  return (
    <Router>
    <Header />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
     {/* <Route path="/faqs" element={< FAQs />} />
      <Route path="/ongs" element={< OngsList />} />
      <Route path="/ongs-details/:ongId" element={< OngDetail />} />
 */}

    </Routes>
    <Footer />
  </Router>

  );
}

export default App;
