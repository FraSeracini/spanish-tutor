import { useState } from 'react';
import Home from './pages/Home';
import Grammatica from './pages/Grammatica';
import Lessico from './pages/Lessico';
import Conversazione from './pages/Conversazione';

export default function App() {
  const [page, setPage] = useState('home');

  return (
    <>
      {page === 'home' && <Home setPage={setPage} />}
      {page === 'grammatica' && <Grammatica setPage={setPage} />}
      {page === 'lessico' && <Lessico setPage={setPage} />}
      {page === 'conversazione' && <Conversazione setPage={setPage} />}
    </>
  );
}
