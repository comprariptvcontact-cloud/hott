import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import HotPlayerApp from './hp/HotPlayerApp.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HotPlayerApp />
  </StrictMode>,
);
