import HeaderBarItem from "./HeaderBarItem";

function HeaderBar({ data }) {
  return (
    <div className="flex items-center">
      {data.map((item) => {
        return (
          <div onClick={() => console.log("hello")}>
            <HeaderBarItem data={item.title} />
          </div>
        );
      })}
    </div>
  );
}

export default HeaderBar;
