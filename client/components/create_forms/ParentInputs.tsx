import { RefObject, useRef } from 'react';
interface IParentInput {
  ownerRef: RefObject<HTMLInputElement>;
  descRef: RefObject<HTMLTextAreaElement>;
}

const ParentInputs = ({ ownerRef, descRef }: IParentInput) => {
  return (
    <>
      <label className="block text-3xl text-pink-500" htmlFor="owner">
        Enter owner address:
      </label>
      <br />
      <input
        className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 text-xl leading-tight shadow focus:outline-none"
        ref={ownerRef}
        name="owner"
        type="text"
        placeholder="enter owner address"
      />
      <br />
      <label className="mt-3 block text-3xl text-pink-500" htmlFor="desc">
        Enter description:
      </label>
      <br />
      <textarea
        className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 text-xl leading-tight shadow focus:outline-none"
        ref={descRef}
        name="desc"
        placeholder="enter description"
      />
      <br />
    </>
  );
};

export default ParentInputs;
