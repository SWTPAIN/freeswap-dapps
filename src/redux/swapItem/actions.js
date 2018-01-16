import R from 'ramda';
import getWeb3 from '../../utils/getWeb3';

export const UPDATE_NEW_ITEM_NAME = 'SWAP_ITEM/UPDATE_NEW_ITEM_NAME';
export const UPDATE_NEW_ITEM_DESCRIPTION = 'SWAP_ITEM/UPDATE_NEW_ITEM_DESCRIPTION';
export const GET_TOTAL_NUMBER_OF_ITEMS_REQUEST = 'SWAP_ITEM/GET_TOTAL_NUMBER_OF_ITEMS_REQUEST';
export const GET_TOTAL_NUMBER_OF_ITEMS_SUCCESS = 'SWAP_ITEM/GET_TOTAL_NUMBER_OF_ITEMS_SUCCESS';
export const GET_TOTAL_NUMBER_OF_ITEMS_FAILURE = 'SWAP_ITEM/GET_TOTAL_NUMBER_OF_ITEMS_FAILURE';
export const CREATE_ITEM_REQUEST = 'SWAP_ITEM/CREATE_ITEM_REQUEST';
export const CREATE_ITEM_SUCCESS = 'SWAP_ITEM/CREATE_ITEM_SUCCESS';
export const CREATE_ITEM_FAILURE = 'SWAP_ITEM/CREATE_ITEM_FAILURE';
export const GET_ALL_ITEMS_REQUEST = 'SWAP_ITEM/GET_ALL_ITEMS_REQUEST';
export const GET_ONE_ITEM_REQUEST = 'SWAP_ITEM/GET_ONE_ITEM_REQUEST';
export const GET_ONE_ITEM_SUCCESS = 'SWAP_ITEM/GET_ONE_ITEM_SUCCESS';
export const GET_ONE_ITEM_FAILURE = 'SWAP_ITEM/GET_ONE_ITEM_FAILURE';
export const DISABLE_ONE_ITEM_REQUEST = 'SWAP_ITEM/DISABLE_ONE_ITEM_REQUEST';
export const DISABLE_ONE_ITEM_SUCCESS = 'SWAP_ITEM/DISABLE_ONE_ITEM_SUCCESS';
export const DISABLE_ONE_ITEM_FAILURE = 'SWAP_ITEM/DISABLE_ONE_ITEM_FAILURE';
export const REQUEST_ONE_ITEM_REQUEST = 'SWAP_ITEM/REQUEST_ONE_ITEM_REQUEST';
export const REQUEST_ONE_ITEM_SUCCESS = 'SWAP_ITEM/REQUEST_ONE_ITEM_SUCCESS';
export const REQUEST_ONE_ITEM_FAILURE = 'SWAP_ITEM/REQUEST_ONE_ITEM_FAILURE';

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
  return getWeb3
    .then(([web3, freeSwapInstance]) => {
      return new Promise((resolve, reject) => {
        web3.eth.getAccounts((error, accounts) => {
          freeSwapInstance.getItemsCount()
            .then((result) => {
              const resultInNumber = result.toNumber();
              dispatch(getTotalNumberOfItemsSuccess(resultInNumber));
              resolve(resultInNumber);
            })
            .catch(e => {
              console.log('e', e);
              dispatch(getTotalNumberOfItemsFailure(e));
            })
      });
    })
  })
};

export const getOneItemSuccess = item => ({
  type: GET_ONE_ITEM_SUCCESS,
  payload: item
});

export const getOneItemFailure = error => ({
  type: GET_ONE_ITEM_FAILURE,
  payload: error
});

const buildItem = ([index, name, description, stateEnum]) => ({
  id: index.toNumber(),
  name,
  description,
  state: stateEnum.toNumber()
});

export const getOneItem = itemIndex => (dispatch, getState) => {
  dispatch({
    type: GET_ONE_ITEM_REQUEST
  })
  return getWeb3
    .then(([web3, freeSwapInstance]) => {
      return new Promise((resolve, reject) => {
        freeSwapInstance.getItem(itemIndex)
          .then((result) => {
            dispatch(getOneItemSuccess(buildItem(result)));
          })
          .catch(e => {
            dispatch(getOneItemFailure(e));
          })
      });
    })
};

export const getAllItems = () => (dispatch, getState) => {
  return dispatch(getTotalNumberOfItems())
    .then(totalNumberOfItems => {
      dispatch({
        type: GET_ALL_ITEMS_REQUEST
      })
      return getWeb3
        .then(([web3, freeSwapInstance]) => {
          web3.eth.getAccounts((error, accounts) => {
            R.range(0,totalNumberOfItems)
              .map(i =>
                dispatch(getOneItem(i))
              )
          })
      })
    });
};

export const createItemSuccess = error => ({
  type: CREATE_ITEM_SUCCESS,
  payload: error
});

export const createItemFailure = error => ({
  type: CREATE_ITEM_FAILURE,
  payload: error
});

export const createItem = (name, description) => (dispatch, getState) => {
  dispatch({
    type: CREATE_ITEM_REQUEST
  })
  getWeb3
    .then(([web3, freeSwapInstance]) => {
      web3.eth.getAccounts((error, accounts) => {
        freeSwapInstance.createItem(name, description, {from: accounts[0]})
        .then((result) => {
          dispatch(createItemSuccess(result));
          dispatch(getTotalNumberOfItems());
        })
        .catch(e => {
          console.log('e', e);
          dispatch(createItemFailure(e));
        })
      })
    });
}

export const disableItemSuccess = error => ({
  type: DISABLE_ONE_ITEM_SUCCESS,
  payload: error
});

export const disableItemFailure = error => ({
  type: DISABLE_ONE_ITEM_FAILURE,
  payload: error
});

export const disableItem = (itemId) => (dispatch, getState) => {
  dispatch({
    type: DISABLE_ONE_ITEM_REQUEST
  })
  getWeb3
    .then(([web3, freeSwapInstance]) => {
      web3.eth.getAccounts((error, accounts) => {
        console.log('itemId', itemId);
        console.log('accounts', accounts);
        freeSwapInstance.disableItem(itemId, {from: accounts[0], gas: 440000})
        .then((result) => {
          dispatch(disableItemSuccess(result));
          dispatch(getTotalNumberOfItems());
        })
        .catch(e => {
          console.log('e', e);
          dispatch(disableItemFailure(e));
        })
      })
    });
}

export const requestItemSuccess = error => ({
  type: REQUEST_ONE_ITEM_SUCCESS,
  payload: error
});

export const requestItemFailure = error => ({
  type: REQUEST_ONE_ITEM_FAILURE,
  payload: error
});

export const requestItem = (itemId) => (dispatch, getState) => {
  dispatch({
    type: REQUEST_ONE_ITEM_REQUEST
  })
  getWeb3
    .then(([web3, freeSwapInstance]) => {
      web3.eth.getAccounts((error, accounts) => {
        freeSwapInstance.requestItem(itemId, {from: accounts[0], gas: 440000})
        .then((result) => {
          dispatch(requestItemSuccess(result));
          dispatch(getTotalNumberOfItems());
        })
        .catch(e => {
          dispatch(requestItemFailure(e));
        })
      })
    });
}

