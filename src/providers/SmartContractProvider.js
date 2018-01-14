import { Component, Children } from 'react';
import PropTypes from 'prop-types';

class SmartContractProvider extends Component {
  getChildContext() {
    const { web3, freeSwap } = this.props;
    return { web3, freeSwap };
  }

  render() {
    const { children } = this.props;

    return Children.only(children);
  }
}


SmartContractProvider.propTypes = {
  web3: PropTypes.any.isRequired,
  freeSwap: PropTypes.any.isRequired
};

SmartContractProvider.childContextTypes = {
  web3: PropTypes.any.isRequired,
  freeSwap: PropTypes.any.isRequired
};

export default SmartContractProvider;
