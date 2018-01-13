import getWeb3 from '../../utils/getWeb3';
import FreeSwapContract from '../../../build/contracts/FreeSwapBase.json'

export const UPDATE_NEW_ITEM_NAME = 'SWAP_ITEM/UPDATE_NEW_ITEM_NAME';
export const UPDATE_NEW_ITEM_DESCRIPTION = 'SWAP_ITEM/UPDATE_NEW_ITEM_DESCRIPTION';
export const GET_TOTAL_NUMBER_OF_ITEMS_REQUEST = 'SWAP_ITEM/GET_TOTAL_NUMBER_OF_ITEMS_REQUEST';
export const GET_TOTAL_NUMBER_OF_ITEMS_SUCCESS = 'SWAP_ITEM/GET_TOTAL_NUMBER_OF_ITEMS_SUCCESS';
export const GET_TOTAL_NUMBER_OF_ITEMS_FAILURE = 'SWAP_ITEM/GET_TOTAL_NUMBER_OF_ITEMS_FAILURE';

export const updateNewItemName = name => ({
  type: UPDATE_NEW_ITEM_NAME,
  payload: name
});

export const updateNewItemDescription = name => ({
  type: UPDATE_NEW_ITEM_DESCRIPTION,
  payload: name
});

export const getTotalNumberOfItemsSuccess = numOfItems => ({
  type: GET_TOTAL_NUMBER_OF_ITEMS_SUCCESS,
  payload: numOfItems
});

export const getTotalNumberOfItemsFailure = error => ({
  type: GET_TOTAL_NUMBER_OF_ITEMS_FAILURE,
  payload: error
});

export const getTotalNumberOfItems = () => (dispatch, getState) => {
  dispatch({
    type: GET_TOTAL_NUMBER_OF_ITEMS_REQUEST
  })
  getWeb3
    .then(({web3}) => web3)
    .then(web3 => {
      const contract = require('truffle-contract');
      const freeSwap = contract(FreeSwapContract);
      let freeSwapInstance;
      freeSwap.setProvider(web3.currentProvider);
      web3.eth.getAccounts((error, accounts) => {
        freeSwap.deployed()
          .then((instance) => {
            freeSwapInstance = instance;
            return instance;
          })
          .then(result => {
            return freeSwapInstance.getSwapItemsCount();
          })
          .then((result) => {
            console.log('result', result);
            dispatch(getTotalNumberOfItemsSuccess(result.toNumber()));
          })
          .catch(e => {
            dispatch(getTotalNumberOfItemsFailure(e));
          })
      })

    })
}
