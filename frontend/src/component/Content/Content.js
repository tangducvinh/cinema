import ItemMovie from "./ItemMovie/ItemMovie";

function Content({ data }) {
  return (
    <div className="w-full">
      <div class="w-full grid grid-cols-4 gap-3 ">
        {data.map((item) => {
          return <ItemMovie data={item} />;
        })}
      </div>
    </div>
  );
}

export default Content;
