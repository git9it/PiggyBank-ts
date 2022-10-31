import { ethers } from 'ethers';
import defaultProvider from '../defaultProvider';

const address = '0x6E2Bf7215995e4730376B10dB6e366D5a325699e';

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
        internalType: 'uint64',
        name: '_endTime',
        type: 'uint64',
      },
    ],
    name: 'createTimePiggyBank',
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

const timePiggyBankFactory = new ethers.Contract(address, abi, defaultProvider);

export default timePiggyBankFactory;
