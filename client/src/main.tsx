
import { createRoot } from 'react-dom/client'
import '@/app/index.css'
import App from "@/app/App"
import { BrowserRouter } from 'react-router-dom'
import { store } from './app/providers/store/store';
import { Provider } from 'react-redux'

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
      <BrowserRouter>
        <App />
    </BrowserRouter>
  </Provider>
)
