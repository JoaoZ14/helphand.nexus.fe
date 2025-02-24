import './App.css';
import { Route, Routes } from "react-router-dom";
import Home from './components/pages/home';
import Footer from './components/utils/footer';
import Header from './components/utils/header';
import FAQs from './components/pages/FAQs';
import OngsList from './components/pages/ongsList';
import OngDetail from './components/pages/ongDetail';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/faqs" element={<FAQs />} />
        <Route path="/ongs" element={<OngsList />} />
        <Route path="/ong-details/:id" element={<OngDetail />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
