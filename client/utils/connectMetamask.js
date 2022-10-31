const connectMetamask = async (updateFunc) => {
  const { ethereum } = window;
  try {
    console.log(process.env.targetChainId);
    const accounts = await ethereum.request({
      method: 'eth_requestAccounts',
    });
    const chainId = await ethereum.request({
      method: 'eth_chainId',
    });
    if (chainId != process.env.targetChainId || 5) {
      await ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: process.env.targetChainId || 5 }],
      });
    }
    updateFunc({ currentAccount: accounts[0] });
    sessionStorage.setItem('currentAccount', accounts[0]);
  } catch (error) {
    console.error(error);
  }
};

export default connectMetamask;
