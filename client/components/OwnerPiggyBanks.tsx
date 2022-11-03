import Layout from './Layout';
import PiggyBankCard from './PiggyBankCard';

interface IOwnerPiggyBanks {
  arrayOfAddressesAndTypes: string[];
}

const OwnerPiggyBanks = ({ arrayOfAddressesAndTypes }: IOwnerPiggyBanks) => {
  const renderPiggyBanks = arrayOfAddressesAndTypes.map((arr) => (
    <PiggyBankCard address={arr[0]} type={arr[1]} key={arr[0]} />
  ));
  {
    console.log(renderPiggyBanks);
  }
  return <Layout>{renderPiggyBanks}</Layout>;
};

export default OwnerPiggyBanks;
