const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers');
const { assert } = require('chai');

describe('Game4', function () {
  async function deployContractAndSetVariables() {
    const Game = await ethers.getContractFactory('Game4');
    const game = await Game.deploy();

    const signer = ethers.provider.getSigner(0);
    const signer1 = ethers.provider.getSigner(1);

    return { game, signer, signer1 };
  }
  it('should be a winner', async function () {
    const { game, signer, signer1 } = await loadFixture(deployContractAndSetVariables);

    // nested mappings are rough :}
    const address = await signer.getAddress();
    const address1 = await signer1.getAddress();

    await game.connect(signer).write(address1);

    await game.connect(signer1).win(address);

    // leave this assertion as-is
    assert(await game.isWon(), 'You did not win the game');
  });
});
