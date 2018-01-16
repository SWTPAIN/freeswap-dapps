const debug = require("debug")("ck");
const utils = require('./utils.js');

var FreeSwapBase = artifacts.require("../contracts/FreeSwapBase.sol");

contract('FreeSwapBase', function(accounts) {
  let freeSwap;
  let user1;
  let user2;

  async function deployContract() {
    debug("deploying contract");
    freeSwap = await FreeSwapBase.new();
    const eventsWatch = freeSwap.allEvents();
    eventsWatch.watch((err, res) => {
      if (err) return;
      debug(">>", res.event, res.args);
    });
  }

  user1 = accounts[0];
  user2 = accounts[1];
  describe("Initial state", function() {
    before(deployContract);
    it("should start with no item", async function() {
      let count = await freeSwap.getItemsCount();
      assert.equal(count.valueOf(), 0, "initial item is not zero")
    });
  });

  describe('Create Item', function() {
    before(deployContract);

    it("should be able to create new item", async function() {
      await freeSwap.createItem('pen', 'black color', {from: user1});
      let count = await freeSwap.getItemsCount();
      assert.equal(count, 1, "cannot create new item")
      const [id, name, description, state] = await freeSwap.getItem(0)
      assert.equal(id.valueOf(), 0, "wrong id")
      assert.equal(name, 'pen', "same id")
      assert.equal(description, 'black color', "description changed")
      assert.equal(state, 0, "initial state is not available")
    });

    it("should be able to disable new item", async function() {
      await freeSwap.disableItem(0, {from: user1});
      const [,,, state] = await freeSwap.getItem(0);
      assert.equal(state.valueOf(), 2, 'state is not disable');
    });

    it("should not be able to disable item not belonging to the owner", async function() {
      let count = await freeSwap.getItemsCount();
      try {
        await freeSwap.createItem('pen 2', 'red color', {from: user1});
        await freeSwap.disableSwapItem(1, {from: user2});
      } catch (e) {
        const [,,, state] = await freeSwap.getItem(1);
        assert.equal(state.valueOf(), 0, 'state is changed');
      }
    });

  });
  describe('Swap Item', function() {
    beforeEach(deployContract);
    beforeEach(async function() {
      await freeSwap.createItem('pen', 'black color', {from: user1});
      await freeSwap.createItem('pen', 'red color', {from: user2});
    });

    it("should be able to request available item", async function() {
      await freeSwap.requestItem(0, {from: user2});
      const result = await freeSwap.getRequestersOfItem(0);
      assert.equal(result.length, 1, 'more than 1 requester');
      assert.equal(result[0], user2, 'wrong requester');
    });

    it("should not be able to request user own item", async function() {
      try {
        await freeSwap.requestItem(0, {from: user1})
      } catch (e) {
        const result = await freeSwap.getRequestersOfItem(0);
        assert.equal(result.length, 0, 'requeser number is changed');
      }
    });

    it("should not be able to request confirmed item", async function() {
    });

    it("should not be able to request disabled item", async function() {
      try {
        await freeSwap.disableSwapItem(0, {from: user1});
        await freeSwap.requestItem(0, {from: user2})
      } catch (e) {
        const result = await freeSwap.getRequestersOfItem(0);
        assert.equal(result.length, 0, 'requeser number is changed');
      }
    });

    it("should be able to swap if two users have request item from another", async function() {
      await freeSwap.requestItem(0, {from: user2});
      await freeSwap.requestItem(1, {from: user1});
      const [,,, item1State] = await freeSwap.getItem(0);
      assert.equal(item1State.valueOf(), 1);
      const [,,, item2State] = await freeSwap.getItem(1);
      assert.equal(item2State.valueOf(), 1);
    });

  });

})
