import { ethers } from 'ethers';
import { ExternalProvider } from '@ethersproject/providers';

//!! разобраться как перенести это в отдельный d.ts
declare global {
  interface Window {
    ethereum?: ExternalProvider;
  }
}

let metamaskProvider;

if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
  metamaskProvider = new ethers.providers.Web3Provider(window.ethereum);
}

export default metamaskProvider;
