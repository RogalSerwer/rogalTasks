import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { CookiesProvider} from 'react-cookie'
import { AppContextProvider } from './utils/consts/AppContext.jsx'
import './index.css'
import App from './App.jsx'


createRoot(document.getElementById('root')).render(
  <CookiesProvider>
    <AppContextProvider>
      <StrictMode>
        <App />
      </StrictMode>
    </AppContextProvider>
  </CookiesProvider>
)
