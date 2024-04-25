import Header from "../Header/header";

function DefaultLayout({ children }) {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
}

export default DefaultLayout;
