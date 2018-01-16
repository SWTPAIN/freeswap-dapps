const debug = require("debug")("ck");
var FreeSwapBase = artifacts.require("../contracts/FreeSwapBase.sol");

contract('FreeSwapBase', function(accounts) {
  let freeSwap;
  let user1;
  let user2;

  async function deployContract() {
    debug("deploying contract");
    freeSwap = await FreeSwapBase.new();
  }

  user1 = accounts[0];
  user2 = accounts[1];
  describe("Initial state", function() {
    before(deployContract);
    it("should start with no swap item", async function() {
      let count = await freeSwap.getSwapItemsCount();
      assert.equal(count.valueOf(), 0, "initial swap item is not zero")
    });
  });

  describe('Create Swap Item', function() {
    before(deployContract);

    it("should be able to create new item", async function() {
      await freeSwap.createSwapItem('pen', 'black color', {from: user1});
      let count = await freeSwap.getSwapItemsCount();
      let address = await freeSwap.getSwapItemAddress(0);
      assert.equal(count, 1, "cannot create new item")
      const [id, name, description, state] = await freeSwap.getSwapItem(0)
      assert.equal(id.valueOf(), 0, "wrong id")
      assert.equal(name, 'pen', "same id")
      assert.equal(description, 'black color', "description changed")
      assert.equal(state, 0, "initial state is not available")
    });

    it("should be able to disable new item", async function() {
      await freeSwap.disableSwapItem(0, {from: user1});
      const [,,, state] = await freeSwap.getSwapItem(0);
      assert.equal(state.valueOf(), 2, 'state is not disable');
    });

    it("should not be able to disable item not belonging to the owner", async function() {
      let count = await freeSwap.getSwapItemsCount();
      try {
        await freeSwap.createSwapItem('pen 2', 'red color', {from: user1});
        await freeSwap.disableSwapItem(1, {from: user2});
      } catch (e) {
        const [,,, state] = await freeSwap.getSwapItem(1);
        assert.equal(state.valueOf(), 0, 'state is changed');
      }
    });

  });
})
