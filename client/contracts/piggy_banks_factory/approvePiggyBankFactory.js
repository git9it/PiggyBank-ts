import { ethers } from 'ethers';
import defaultProvider from '../defaultProvider';

const address = '0xE2bE8DD8f0609E8777dE3a812a936629aDb47018';

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
        internalType: 'address',
        name: '_approver',
        type: 'address',
      },
    ],
    name: 'createApprovePiggyBank',
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

const approvePiggyBankFactory = new ethers.Contract(
  address,
  abi,
  defaultProvider
);

export default approvePiggyBankFactory;
