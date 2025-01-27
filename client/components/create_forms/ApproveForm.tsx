interface IApproveForm {
  setAdditionalInfo: React.Dispatch<React.SetStateAction<{}>>;
  additionalInfo: {
    approver: string | undefined;
  };
}

const ApproveForm = ({ additionalInfo, setAdditionalInfo }: IApproveForm) => {
  return (
    <div>
      <label className="block text-3xl text-pink-500" htmlFor="approver">
        Enter Approver address:
      </label>
      <br />
      <input
        className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 text-xl leading-tight shadow focus:outline-none"
        value={additionalInfo?.approver || ''}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setAdditionalInfo({
            ...additionalInfo,
            approver: event.target.value,
          });
        }}
        name="approver"
        type="text"
        placeholder="enter approver address"
      />
    </div>
  );
};

export default ApproveForm;
