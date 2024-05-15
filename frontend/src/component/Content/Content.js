import ItemMovie from "./ItemMovie/ItemMovie";

function Content({ data }) {
  return (
    <div className="w-full">
      <div class="flex flex-wrap ">
        {data.map((item) => {
          return <ItemMovie data={item} />;
        })}
      </div>
    </div>
  );
}

export default Content;
