pragma solidity ^0.4.18;

contract FreeSwapBase {
  /*** EVENTS ***/
  event ItemCreated(address indexed giver, uint itemIndex, string name);
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
    ItemCreated(msg.sender, swapItemIndex, _name);
    return swapItemIndex;
  }

  function getSwapItems() public view returns (SwapItem[]) {
    return swapItems;
  }

  function getSwapItem(uint itemIndex) public view returns (uint, string, string, SwapItemState) {
    SwapItem memory swapItem = swapItems[itemIndex];
    return (itemIndex, swapItem.name, swapItem.description, swapItem.state);
  }

  function getSwapItemsCount() public view returns (uint) {
    return swapItems.length;
  }

}
