import { ethers } from 'ethers';
import defaultProvider from '../defaultProvider';

const address = '0x838A16e8A5e3fC199DC944490d2138F8Eb167b59';

const abi = [
  {
    inputs: [
      {
        internalType: 'address',
        name: '_master',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_owner',
        type: 'address',
      },
      {
        internalType: 'string',
        name: '_desc',
        type: 'string',
      },
      {
        internalType: 'uint256',
        name: '_targetAmount',
        type: 'uint256',
      },
    ],
    name: 'createAmountPiggyBank',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
];

const amountPiggyBankFactory = new ethers.Contract(
  address,
  abi,
  defaultProvider
);

export default amountPiggyBankFactory;
