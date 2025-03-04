import { createRoot } from 'react-dom/client'
import './index.css'
import { App } from './app/App'
// import { AppHttpRequests } from "./app/AppHttpRequests"
import { Provider } from 'react-redux'
import { store } from './app/store'

createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <App />
        {/* <AppHttpRequests /> */}
    </Provider>,
)
