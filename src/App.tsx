import { Route, Routes } from 'react-router-dom';
import { AdminApp } from './admin/app';
import { VintageApp } from './vintage/app';
// 스코프별 엔트리

export default function App() {
  return (
    <Routes>
      {/* vintage scope */}
      <Route path="/vintage/*" element={<VintageApp />} />
      {/* admin scope */}
      <Route path="/admin/*" element={<AdminApp />} />
    </Routes>
  );
}
