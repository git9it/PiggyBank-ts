import Header from './Header';

const Layout = ({ children }: { children: JSX.Element[] | JSX.Element }) => {
  return (
    <div>
      <Header />
      <div className="w-full m-auto items-center max-w-[1440px] px-6">
        {children}
      </div>
    </div>
  );
};

export default Layout;
