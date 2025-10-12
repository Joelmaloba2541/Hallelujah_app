import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Events from './pages/Events';
import Sermons from './pages/Sermons';
import Ministries from './pages/Ministries';
import Donations from './pages/Donations';
import PrayerRequests from './pages/PrayerRequests';
import About from './pages/About';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app d-flex flex-column min-vh-100">
        <Navbar />
        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/events" element={<Events />} />
            <Route path="/sermons" element={<Sermons />} />
            <Route path="/ministries" element={<Ministries />} />
            <Route path="/donations" element={<Donations />} />
            <Route path="/prayer-requests" element={<PrayerRequests />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
