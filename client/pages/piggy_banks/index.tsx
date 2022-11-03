import FindPiggyBankForm from '../../components/FindPiggyBankForm';
import FindUsersPiggyBanksForm from '../../components/FindUsersPiggyBanksForm';
import Layout from '../../components/Layout';
import OwnerPiggyBanks from '../../components/OwnerPiggyBanks';
import PiggyBankView from '../../components/PiggyBankView';
import getPiggyBankParentInfo from '../../utils/getPiggyBankParentInfo';
import { useEffect } from 'react';
import getPiggyBankTypeByAddressAndOwner from '../../utils/getPiggyBankTypeByAddressAndOwner';
import piggyBankMaster from '../../contracts/piggyBankMaster';

interface IPiggyBanksPage {
  arrayOfAddressesAndTypes: [];
  address: string;
  piggyBankInfo: {
    address: string;
    owner: string;
    isOver: boolean;
    desc: string;
    isWithdrawAvailable: boolean;
    balance: number;
    type: string;
  };
}

const PiggyBanksPage = (props: IPiggyBanksPage) => {
  useEffect(() => {
    document.title = 'PiggyBank';
  });
  if (props.arrayOfAddressesAndTypes) {
    if (props.arrayOfAddressesAndTypes.length > 0) {
      return (
        <OwnerPiggyBanks
          arrayOfAddressesAndTypes={props.arrayOfAddressesAndTypes}
        />
      );
    } else {
      return (
        <Layout>
          <h1 className="text-7xl">This user has no piggy banks</h1>
        </Layout>
      );
    }
  }

  return (
    <Layout>
      <div className="mt-12 ">
        {props.address && (
          <h1 className="mt-16 flex justify-center border border-red-300 bg-red-300 py-1 px-4 text-center text-2xl text-red-800 hover:bg-red-500">
            {props.address} is not correct or empty! Try again with another
            address
          </h1>
        )}
        {props.piggyBankInfo ? (
          <PiggyBankView {...props.piggyBankInfo} />
        ) : (
          <>
            <FindPiggyBankForm />
            <FindUsersPiggyBanksForm />
          </>
        )}
      </div>
    </Layout>
  );
};

export default PiggyBanksPage;

interface IgetServerSideProps {
  query: {
    user: string;
    address: string;
    type: string;
  };
}

export async function getServerSideProps(props: IgetServerSideProps) {
  const { user, address, type } = props.query;
  console.log(props);
  if (address) {
    try {
      const response = await getPiggyBankParentInfo(address);
      return {
        props: {
          piggyBankInfo: {
            ...response,
            type:
              type ||
              (await getPiggyBankTypeByAddressAndOwner(
                address,
                response.owner
              )),
          },
        },
      };
    } catch (error) {
      console.error(error);
      return {
        props: { address },
      };
    }
  }

  if (user) {
    try {
      const response = await piggyBankMaster.getPiggyBanksByOwner(user);
      return { props: { arrayOfAddressesAndTypes: response } };
    } catch (error) {
      console.error(error);
    }
  }

  return {
    props: {},
  };
}
