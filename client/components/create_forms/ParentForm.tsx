import { useRouter } from 'next/router';
import { useRef, useState } from 'react';
import data from '../../data/data';
import { useAppContext } from '../../hooks/useAppContext';
import connectMetamask from '../../utils/connectMetamask';
import getErrorMessage from '../../utils/getErrorMessage';
import ErrorView from '../ErrorView';
import Loader from '../Loader';
import FormTypesSelect from './FormTypesSelect';
import ParentInputs from './ParentInputs';

const ParentForm = () => {
  const [piggyBankType, setPiggyBankType] = useState<string>(
    Object.keys(data)[0]
  );
  const [additionalInfo, setAdditionalInfo] = useState({});
  const [error, setError] = useState<string>();
  const [isPending, setPending] = useState(false);
  const { contextState, updateContextState } = useAppContext();
  const currentAccount = contextState?.currentAccount;
  const router = useRouter();
  const ownerRef = useRef<HTMLInputElement>(null);
  const descRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    console.log(event);
    event.preventDefault();
    if (!ownerRef?.current?.value) {
      setError('No wallet input');
      setTimeout(() => {
        setError('');
      }, 2000);
      return;
    }
    if (!descRef?.current?.value) {
      setError('No description input');
      setTimeout(() => {
        setError('');
      }, 2000);
      return;
    }
    setPending(true);
    try {
      await data[piggyBankType].createFunc(
        ownerRef.current.value,
        descRef.current.value,
        additionalInfo
      );
      router.push({
        pathname: '/piggy_banks',
        query: { user: ownerRef.current.value },
      });
    } catch (error) {
      console.log(error);
      const message = getErrorMessage(error);
      setError(message);
      setTimeout(() => {
        setError('');
      }, 2000);
      console.error(message);
    } finally {
      setPending(false);
    }
  };

  const handleConnectMetamaskClick = async () => {
    connectMetamask(updateContextState);
  };

  return (
    <form
      className="ml-6 mb-4 max-w-6xl rounded border-2 border-pink-300 bg-white px-8 pt-6 pb-8 shadow-md"
      onSubmit={handleSubmit}
    >
      //
      <ParentInputs ownerRef={ownerRef} descRef={descRef} />
      ///
      <FormTypesSelect
        piggyBankType={piggyBankType}
        setPiggyBankType={setPiggyBankType}
      />
      {data[piggyBankType].form({ additionalInfo, setAdditionalInfo })}
      <br />
      {!currentAccount ? ( //выводит кнопку метамаска, если не подключен
        <div className="flex justify-center">
          <button
            className="rounded-2xl border-2 border-pink-500 bg-pink-100 px-[18px] py-1 text-5xl font-semibold hover:bg-pink-300"
            onClick={handleConnectMetamaskClick}
            type="button"
          >
            Connect Metamask
          </button>
        </div>
      ) : isPending ? (
        <Loader />
      ) : (
        <button
          className="rounded border border-pink-300 bg-pink-100 py-1 px-4 text-xl hover:bg-pink-300"
          type="submit"
        >
          Create
        </button>
      )}
      {error && <ErrorView error={error} />}
    </form>
  );
};

export default ParentForm;
