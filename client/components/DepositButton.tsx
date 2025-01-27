import { ethers } from 'ethers';
import { useRouter } from 'next/router';
import React, { useRef } from 'react';
import getErrorMessage from '../utils/getErrorMessage';
import { Contract } from 'ethers';

interface IDepositButton {
  setError: React.Dispatch<React.SetStateAction<string | undefined>>;
  setPending: React.Dispatch<React.SetStateAction<boolean>>;
  piggyBankWithSigner: Contract;
}

class ProviderRpcError extends Error {
  code: string;
  message: string;
  data?: unknown;
  constructor(message: string, code: string, data?: unknown) {
    super();
    this.code = code;
    this.message = message;
    this.data = data;
  }
}

const DepositButton = ({
  setError,
  setPending,
  piggyBankWithSigner,
}: IDepositButton) => {
  const router = useRouter();
  const amountRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setPending(true);
    setError('');

    try {
      if (amountRef.current) {
        const amount = ethers.utils.parseEther(amountRef.current.value);
        const tx = await piggyBankWithSigner.deposit({ value: amount });
        await tx.wait();
        router.reload();
      }
    } catch (error) {
      const err = error as ProviderRpcError;
      const message = getErrorMessage(err);
      setError(message);
      setTimeout(() => {
        setError('');
      }, 2000);
      console.error(message);
    } finally {
      setPending(false);
    }
  };

  return (
    <form className="inline-block" onSubmit={handleSubmit}>
      <label className="p-3 text-2xl" htmlFor="amount">
        Amount in ether:
      </label>
      <input
        name="amount"
        ref={amountRef}
        type="text"
        placeholder="how many ether?"
        className="my-2 ml-2 rounded border border-pink-300 bg-pink-100 py-1 px-4 text-xl"
      />
      <button
        type="submit"
        className={`my-2 ml-2 rounded border border-pink-300 bg-pink-100 py-1 px-4 text-xl hover:bg-pink-300  `}
      >
        Deposit
      </button>
    </form>
  );
};

export default DepositButton;
