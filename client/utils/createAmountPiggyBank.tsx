import amountPiggyBankFactory from '../contracts/piggy_banks_factory/amountPiggyBankFactory';
import ContractWithSinger from '../contracts/ContractWithSigner';
import { parseEther } from 'ethers/lib/utils';

interface IAmountPiggyBankAdditional {
  amount: string;
}

const createAmountPiggyBank = async (
  owner: string,
  desc: string,
  additionalInfo: IAmountPiggyBankAdditional
) => {
  console.log('Amount Piggy');
  if (!additionalInfo?.amount) {
    throw new Error('Incorrect Amount');
  }
  const tx = await ContractWithSinger(
    amountPiggyBankFactory
  ).createAmountPiggyBank(owner, desc, parseEther(additionalInfo.amount));

  await tx.wait();
};

export default createAmountPiggyBank;
