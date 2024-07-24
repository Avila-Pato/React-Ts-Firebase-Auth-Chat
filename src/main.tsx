import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { firebaseConfig } from './lib/firebase.config.ts'
import { FirebaseAppProvider } from 'reactfire'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>


  <FirebaseAppProvider firebaseConfig={firebaseConfig} >

    <App />

  </FirebaseAppProvider>

  </React.StrictMode>,

)
