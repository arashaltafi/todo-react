import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import './assets/animate.min.css'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { store } from './redux/Store.ts'
import { CssBaseline } from '@mui/material'
import { CookiesProvider } from 'react-cookie';

ReactDOM.createRoot(document.getElementById('root')!).render(
<Provider store={store}>
    <CookiesProvider defaultSetOptions={{ path: '/' }}>
      <BrowserRouter basename='/'>
        <CssBaseline />
        <App />
      </BrowserRouter>
    </CookiesProvider>
  </Provider>
)
