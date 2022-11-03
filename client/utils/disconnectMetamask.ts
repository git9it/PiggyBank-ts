const disconnectMetamask = async (updateFunc: Function) => {
  updateFunc({ currentAccount: null });
  sessionStorage.clear();
};

export default disconnectMetamask;
