import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import {CurrencyState} from "./feature/nav/context/CurrencyContext";
import {Provider} from "react-redux";
import {store} from "./feature/store";
import {TotalPriceState} from "./pages/context/TotalPriceContext";
import {CountState} from "./feature/nav/context/CountItemsInBucketContext";


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
