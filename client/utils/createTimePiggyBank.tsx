import ContractWithSinger from '../contracts/ContractWithSigner';
import timePiggyBankFactory from '../contracts/piggy_banks_factory/timePiggyBankFactory';

interface ITimePiggyBankAdditional {
  date: number;
}

const createTimePiggyBank = async (
  owner: string,
  desc: string,
  additionalInfo: ITimePiggyBankAdditional
) => {
  if (additionalInfo.date - Date.now() < 0) {
    throw new Error('Incorrect end date');
  }

  const tx = await ContractWithSinger(timePiggyBankFactory).createTimePiggyBank(
    owner,
    desc,
    additionalInfo.date / 1000
  );

  await tx.wait();
};

export default createTimePiggyBank;
