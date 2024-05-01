import HeaderBarItem from "./HeaderBarItem";

function HeaderBar({ data }) {
  return (
    <div className="flex items-center">
      {data.map((item) => {
        return <HeaderBarItem data={item.title} />;
      })}
    </div>
  );
}

export default HeaderBar;
