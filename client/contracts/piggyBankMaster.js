import { ethers } from 'ethers';
import defaultProvider from './defaultProvider';

const address = '0x772B75d2EDe674C678E21F53323eaFe767F8E0A0';
//000000000000000000000000772B75d2EDe674C678E21F53323eaFe767F8E0A0

const abi = [
  {
    inputs: [
      {
        internalType: 'address',
        name: '_owner',
        type: 'address',
      },
    ],
    name: 'getPiggyBanksByOwner',
    outputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'piggyBankAddress',
            type: 'address',
          },
          {
            internalType: 'string',
            name: 'piggyBankType',
            type: 'string',
          },
        ],
        internalType: 'struct PiggyBankMaster.PiggyBankDetails[]',
        name: '',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_owner',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_newPiggyBank',
        type: 'address',
      },
    ],
    name: 'handlePiggyBankCreated',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: '_piggyBankType',
        type: 'string',
      },
      {
        internalType: 'address',
        name: '_factory',
        type: 'address',
      },
    ],
    name: 'registerPiggyBankFactory',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
];

const piggyBankMaster = new ethers.Contract(address, abi, defaultProvider);

export default piggyBankMaster;
