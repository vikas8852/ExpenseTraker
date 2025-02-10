import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './redux/store'
import { PersistGate } from 'redux-persist/lib/integration/react'
import persistStore from 'redux-persist/es/persistStore'

const persistor=persistStore(store);

createRoot(document.getElementById('root')).render(

  <StrictMode>
 <Provider store={store}>
 <PersistGate loading={null} persistor={persistor}>
 <App />
 </PersistGate>

 </Provider>
  </StrictMode>
)
