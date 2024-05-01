import Header from "../../Header/header";

function DefaultLayout({ children }) {
  return (
    <div>
      <Header />
      <div className="mx-80">{children}</div>
    </div>
  );
}

export default DefaultLayout;
