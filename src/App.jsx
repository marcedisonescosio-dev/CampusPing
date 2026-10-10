import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Chat from './pages/Chat';
import Alerts from './pages/Alerts';

function App() {
  return (
    <Router>
      <Navbar />
      <main className="page-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/alerts" element={<Alerts />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
