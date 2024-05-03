import ItemMovie from "./ItemMovie/ItemMovie";

function Content({ data }) {
  return (
    <div>
      <div class="grid grid-cols-4 gap-4">
        {data.map((item) => {
          return <ItemMovie data={item} />;
        })}
      </div>
    </div>
  );
}

export default Content;
