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

const getErrorMessage = (error: ProviderRpcError) => {
  if (error.code === 'INSUFFICIENT_FUNDS') {
    return 'Not Enough Funds';
  }

  if (error.code === 'INVALID_ARGUMENT') {
    return 'Invalid Input';
  }

  if (error.code === 'ACTION_REJECTED') {
    return 'Transaction was Rejected';
  }

  return error.message || error.code;
};

export default getErrorMessage;
