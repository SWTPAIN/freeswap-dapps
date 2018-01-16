const expectThrow = async promise => {
    try {
      await promise;
    } catch (err) {
      const outOfGas = err.message.includes("out of gas");
      const invalidOpcode = err.message.includes("invalid opcode");
      assert(
              outOfGas || invalidOpcode,
              "Expected throw, got `" + err + "` instead"
            );
      return;
    }
    assert.fail("Expected throw not received");
};

module.exports = {
  expectThrow: expectThrow
}
