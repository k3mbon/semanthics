import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Menu from './pages/Menu';
import Login from './pages/Login';
import Info from './pages/Info';
import Belajar from './pages/Belajar';
import Berlatih from './pages/Berlatih';
import Penjumlahan from './pages/Penjumlahan';
import Pengurangan from './pages/Pengurangan';
import Perkalian from './pages/Perkalian';
import Pembagian from './pages/Pembagian';
import NotFound from './pages/NotFound';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Menu />} />
        <Route path="/menu" element={<Navigate to="/" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/info" element={<Info />} />
        <Route path="/belajar/*" element={<Belajar />} />
        <Route path="/berlatih">
          <Route index element={<Berlatih />} />
          <Route path="penjumlahan" element={<Penjumlahan />} />
          <Route path="pengurangan" element={<Pengurangan />} />
          <Route path="perkalian" element={<Perkalian />} />
          <Route path="pembagian" element={<Pembagian />} />
        </Route>
        <Route path="/penjumlahan" element={<Navigate to="/berlatih/penjumlahan" replace />} />
        <Route path="/pengurangan" element={<Navigate to="/berlatih/pengurangan" replace />} />
        <Route path="/perkalian" element={<Navigate to="/berlatih/perkalian" replace />} />
        <Route path="/pembagian" element={<Navigate to="/berlatih/pembagian" replace />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
