import NextNodeServer from 'next/dist/server/next-server';

interface ICardViewProps {
  children?: React.ReactNode;
}

const CardView = ({ children }: ICardViewProps) => {
  return (
    <div className="m-6 border-2 border-pink-300 bg-white p-8">{children}</div>
  );
};

export default CardView;
