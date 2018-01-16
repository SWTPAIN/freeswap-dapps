pragma solidity ^0.4.18;

contract FreeSwapBase {
  /*** EVENTS ***/
  event ItemCreated(address indexed giver, uint itemId, string name);
  enum SwapItemState {Created, Swaped, Disabled}

  struct SwapItem {
    string name;
    string description;
    SwapItemState state;
  }

  SwapItem[] public swapItems;
  mapping (uint => address) public swapItemIdToGiver;
  mapping (uint => address[]) public swapItemIdToPotentialTakers;
  mapping (uint => address) public swapItemIdToTaker;


  function getSwapItemAddress(uint itemId) public view returns (address) {
    return swapItemIdToGiver[itemId];
  }

  function createSwapItem(string _name, string _description) external returns (uint) {
    uint swapItemId = swapItems.push(SwapItem(_name, _description, SwapItemState.Created)) - 1;
    swapItemIdToGiver[swapItemId] = msg.sender;
    ItemCreated(msg.sender, swapItemId, _name);
    return swapItemId;
  }

  function getSwapItem(uint itemId)
    public
    view
    returns (
    uint _itemId, string name, string description, SwapItemState state
  ) {
    SwapItem storage swapItem = swapItems[itemId];
    _itemId = itemId;
    name = swapItem.name;
    description = swapItem.description;
    state = swapItem.state;
  }

  function getSwapItemsCount() public view returns (uint) {
    return swapItems.length;
  }

  function disableSwapItem(uint itemId) public {
    require(msg.sender == swapItemIdToGiver[itemId]);
    swapItems[itemId].state = SwapItemState.Disabled;
  }

}
