import Button from "../../Button/Button";

function MenuItem({ data, onClick, ...pastProps }) {
  const props = {
    onClick,
    ...pastProps,
  };
  return (
    <div
      className="flex items-center justify-center py-2 px-2 hover:border-l-4 hover:text-[text-primary] hover:border-yellow-500 cursor-pointer"
      {...props}
    >
      <span className="mr-3 ">{data.icon}</span>
      <p className="text-[-14]">{data.title}</p>
    </div>
  );
}

export default MenuItem;
