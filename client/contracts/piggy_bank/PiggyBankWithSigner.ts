import metamaskProvider from '../metamaskProvider';
import PiggyBank from './PiggyBank';

const PiggyBankWithSigner = (address: string) => {
  const piggyBank = PiggyBank(address);
  const signer = metamaskProvider?.getSigner();
  return piggyBank.connect(signer);
};

export default PiggyBankWithSigner;
