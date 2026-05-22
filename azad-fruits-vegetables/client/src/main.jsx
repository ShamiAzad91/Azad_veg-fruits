import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'antd/dist/reset.css';
import App from './App.jsx'
import { AuthProvider } from './context/Auth.jsx'
import { SearchProvider } from './context/Search.jsx'
import { CartProvider } from './context/Cart.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <SearchProvider>
        <CartProvider>
    <App />

        </CartProvider>

      </SearchProvider>
    </AuthProvider>
  </StrictMode>,
)
