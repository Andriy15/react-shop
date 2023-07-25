import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import {CurrencyState} from "./feature/nav/context/CurrencyContext";
import {Provider} from "react-redux";
import {store} from "./feature/store";
import {TotalPriceState} from "./feature/product/context/TotalPriceContext";
import {CountState} from "./feature/nav/context/CountItemsInBucketContext";
import {ModalState} from "./feature/bucket/context/Modal.context";


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <>
        <ModalState>
        <TotalPriceState>
        <CurrencyState>
        <CountState>
          <App />
        </CountState>
        </CurrencyState>
        </TotalPriceState>
        </ModalState>
      </>
    </BrowserRouter>
  </Provider>
)
