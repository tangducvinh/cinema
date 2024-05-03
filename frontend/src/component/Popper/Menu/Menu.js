import Tippy from "@tippyjs/react/headless";
import { Wrapper as PopperWrapper } from "../index";
import MenuItem from "./MenuItem";
function Menu({ children, items }) {
  const renderItem = () => {
    return items.map((item, index) => <MenuItem key={index} data={item} />);
  };

  return (
    <Tippy
      interactive
      render={(attrs) => (
        <div tabIndex="-1" {...attrs}>
          <PopperWrapper>{renderItem()}</PopperWrapper>
        </div>
      )}
    >
      {children}
    </Tippy>
  );
}

export default Menu;
