import React from 'react'
import ReactDOM from 'react-dom/client'
// import DenseAppBar from './components/Header.tsx'
import './index.css'
import EmployForm from './components/Employ.tsx'
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <EmployForm />
  </React.StrictMode>,
)
