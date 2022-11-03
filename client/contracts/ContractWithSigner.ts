import metamaskProvider from './metamaskProvider';
import { Contract } from 'ethers';

const ContractWithSinger = (contract: Contract) => {
  const signer = metamaskProvider?.getSigner();
  return contract.connect(signer);
};

export default ContractWithSinger;
