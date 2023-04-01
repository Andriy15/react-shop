import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {ModalState} from "./context/ModalContext";
import {BrowserRouter} from "react-router-dom";
import {CurrencyState} from "./context/CurrencyContext";
import {Provider} from "react-redux";
import {store} from "./store";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
   <Provider store={store}>
     <BrowserRouter>
       <>
         <CurrencyState>
         <ModalState>
           <App />
         </ModalState>
         </CurrencyState>
       </>
     </BrowserRouter>
   </Provider>
)
