interface IAmountForm {
  setAdditionalInfo: React.Dispatch<React.SetStateAction<{}>>;
  additionalInfo: {
    amount: string | undefined;
  };
}

const AmmoutForm = ({ additionalInfo, setAdditionalInfo }: IAmountForm) => {
  return (
    <div>
      <label className="mt-3 block text-3xl text-pink-500" htmlFor="amount">
        Enter amount for Piggy (eth):
      </label>
      <br />
      <input
        className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 text-xl leading-tight shadow focus:outline-none "
        value={additionalInfo?.amount || ''}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setAdditionalInfo({ ...additionalInfo, amount: event.target.value });
        }}
        name="amount"
        type="text"
        placeholder="enter amount on ETH"
      />
    </div>
  );
};

export default AmmoutForm;
