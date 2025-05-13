import { createRoot } from 'react-dom/client'
import './index.css'
import { App } from './app/App'
import { Provider } from 'react-redux'
import { store } from './app/store'
import { HashRouter } from "react-router"

createRoot(document.getElementById('root')!).render(
  <HashRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </HashRouter>
)
