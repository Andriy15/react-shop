import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import {CurrencyState} from "./context/CurrencyContext";
import {Provider} from "react-redux";
import {store} from "./store";
import {TotalPriceState} from "./context/TotalPriceContext";
import {CountState} from "./context/CountItemsInBucketContext";


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <>
        <TotalPriceState>
        <CurrencyState>
        <CountState>
          <App />
        </CountState>
        </CurrencyState>
        </TotalPriceState>
      </>
    </BrowserRouter>
  </Provider>
)
