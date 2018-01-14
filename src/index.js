import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import App from './App'
import web3 from './utils/getWeb3';
import SmartContractProvider from './providers/SmartContractProvider';

// Redux Store
import store from './store'



const initRender = ([web3, freeSwapInstance]) => {
  ReactDOM.render(
    <Provider store={store}>
      <SmartContractProvider
        web3={web3}
        freeSwap={freeSwapInstance}
      >
        <App />
      </SmartContractProvider>
    </Provider>,
    document.getElementById('root')
  );
};
       
const bootstrap = () => {
  web3
    .then(initRender)
}


bootstrap();
