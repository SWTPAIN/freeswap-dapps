pragma solidity ^0.4.18;

contract FreeSwapBase {
  /*** EVENTS ***/
  event ItemCreated(address indexed giver, uint itemId, string name);
  event ItemRequested(uint itemId);
  event ItemsSwapped(uint itemId1, uint itemId2);
  event Debug();

  enum ItemState {Created, Swapped, Disabled}

  struct Item {
    string name;
    string description;
    ItemState state;
  }

  Item[] public items;
  mapping (uint => address) public itemIdToGiver;
  mapping (uint => address[]) public itemIdToRequesters;
  mapping (uint => address) public itemIdToTaker;
  mapping (address => uint) giverItemCount;

  function createItem(string _name, string _description) external returns (uint) {
    uint itemId = items.push(Item(_name, _description, ItemState.Created)) - 1;
    itemIdToGiver[itemId] = msg.sender;
    giverItemCount[msg.sender]++;
    ItemCreated(msg.sender, itemId, _name);

    return itemId;
  }

  function getItem(uint itemId)
    public
    view
    returns (
    uint _itemId, string name, string description, ItemState state
  ) {
    Item storage item = items[itemId];
    _itemId = itemId;
    name = item.name;
    description = item.description;
    state = item.state;
  }

  function getItemsCount() public view returns (uint) {
    return items.length;
  }

  function getRequestersOfItem(uint itemId) public view returns (address[]) {
    return itemIdToRequesters[itemId];
  }

  function disableItem(uint itemId) public {
    require(msg.sender == itemIdToGiver[itemId]);
    items[itemId].state = ItemState.Disabled;
  }

  function requestItem(uint itemId) public {
    require(msg.sender != itemIdToGiver[itemId]);
    ItemState itemState;
    (,,,itemState) = getItem(itemId);
    require(itemState == ItemState.Created);
    itemIdToRequesters[itemId].push(msg.sender);
    ItemRequested(itemId);
    _checkIfMatch(itemId, msg.sender);
  }

  function getItemsByGiver(address _giver) returns (uint[]) {
    uint[] memory result = new uint[](giverItemCount[_giver]);
    uint counter = 0;
    for (uint i = 0; i < items.length; i++) {
      if (itemIdToGiver[i] == _giver) {
        result[counter] = i;
        counter++;
      }
    }
    return result;
  }

  function _checkIfMatch(uint itemId, address requesterAddress) {
    address giverAddress = itemIdToGiver[itemId];
    uint[] memory requesterItemIds = getItemsByGiver(requesterAddress);
    for (uint i = 0; i < requesterItemIds.length; i++) {
      uint requesterItemId = requesterItemIds[i];
      address[] memory _requesterAddresses = getRequestersOfItem(requesterItemId);
      for (uint j = 0; i < _requesterAddresses.length; j ++) {
        if (_requesterAddresses[j] == giverAddress) {
          _swapItems(itemId, requesterItemId);
          break;
        }
      }
    }
  }
  
  function _swapItems(uint _item1Id, uint _item2Id) {
    Item item1 = items[_item1Id];
    Item item2 = items[_item2Id];
    itemIdToTaker[_item1Id] = itemIdToGiver[_item2Id];
    itemIdToTaker[_item2Id] = itemIdToGiver[_item1Id];
    items[_item1Id].state = ItemState.Swapped;
    items[_item2Id].state = ItemState.Swapped;
    ItemsSwapped(_item1Id, _item2Id);
  }

}
