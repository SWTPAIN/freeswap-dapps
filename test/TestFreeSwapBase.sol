pragma solidity ^0.4.18;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/FreeSwapBase.sol";

contract TestFreeSwapBase {

  function testUserCanCreateSwapItem() public {
    FreeSwapBase freeSwapBase = FreeSwapBase(DeployedAddresses.FreeSwapBase());
    uint itemIndex = freeSwapBase.createSwapItem("pencil", "black pencil");
    Assert.equal(freeSwapBase.getSwapItemsCount(), 1, "It should have empty swapitems initially");
  }

  function testUserCanGetSwapItem() public {
    FreeSwapBase freeSwapBase = FreeSwapBase(DeployedAddresses.FreeSwapBase());
    uint itemIndex = freeSwapBase.createSwapItem("pencil", "black pencil");
    uint returnedItemIndex;
    string memory returnedItemName;
    string memory returnedItemDescription;
    FreeSwapBase.SwapItemState returnedState;
    (returnedItemIndex, returnedItemName, returnedItemDescription, returnedState) = freeSwapBase.getSwapItem(itemIndex);
    Assert.equal(returnedItemIndex, itemIndex, "It should have empty swapitems initially");
  }

}
