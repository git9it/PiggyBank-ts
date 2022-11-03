import { ethers } from 'ethers';
import { ExternalProvider } from '@ethersproject/providers';

type ExtensionForProvider = {
  on: (event: string, callback: (...params: any) => void) => void;
  removeListener: (event: string, callback: (...params: any) => void) => void;
};

type EthersProvider = ExternalProvider & ExtensionForProvider;

//!! разобраться как перенести это в отдельный d.ts
declare global {
  interface Window {
    ethereum?: EthersProvider;
  }
}

let metamaskProvider;

if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
  metamaskProvider = new ethers.providers.Web3Provider(window.ethereum);
}

export default metamaskProvider;
