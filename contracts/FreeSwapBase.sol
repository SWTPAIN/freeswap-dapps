pragma solidity ^0.4.18;

contract FreeSwapBase {
  enum SwapItemState {Created, Swaped, Disabled}

  struct SwapItem {
    string name;
    string description;
    SwapItemState state;
  }

  SwapItem[] public swapItems;
  mapping (uint => address) swapItemIndexToGiver;
  mapping (uint => address[]) swapItemIndexToPotentialTakers;
  mapping (uint => address) swapItemIndexToTaker;


  function createSwapItem(string _name, string _description) external returns (uint) {
    uint swapItemIndex = swapItems.push(SwapItem(_name, _description, SwapItemState.Created));
    swapItemIndexToGiver[swapItemIndex] = msg.sender;
    return swapItemIndex;
  }

  function getSwapItems() public view returns (SwapItem[]) {
    return swapItems;
  }

  function getSwapItemsCount() public view returns (uint) {
    return swapItems.length;
  }

  function testing() public view returns (uint) {
    return 123;
  }

}
