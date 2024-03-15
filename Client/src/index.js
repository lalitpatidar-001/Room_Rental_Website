import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { userContext } from './context/userContext';
import { BrowserRouter } from 'react-router-dom';
import UserContextProvider from './providers/UserContextProvider';
import { Toaster } from 'react-hot-toast';



const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <>
          <UserContextProvider>
            <React.StrictMode>
              <BrowserRouter>
                <App />
              </BrowserRouter>
            </React.StrictMode>
          </UserContextProvider>
        
    <Toaster/>
  </>

);


reportWebVitals();
