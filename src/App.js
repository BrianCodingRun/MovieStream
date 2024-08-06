import React from 'react'
import { BrowserRouter } from 'react-router-dom';
import { AuthWrapper, GlobalProvider } from './context/AuthWrapper';

function App() {
  return (
    <GlobalProvider>
      <BrowserRouter>
        <AuthWrapper />
      </BrowserRouter>
    </GlobalProvider>
  )
}
export default App;
