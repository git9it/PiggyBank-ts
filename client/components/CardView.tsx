import NextNodeServer from 'next/dist/server/next-server';

const CardView = ({ children }: { children?: React.ReactNode }) => {
  return (
    <div className="m-6 border-2 border-pink-300 bg-white p-8">{children}</div>
  );
};

export default CardView;
