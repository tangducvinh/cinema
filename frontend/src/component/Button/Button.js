import { Link } from "react-router-dom";
import classNames from "classnames";
function Button({ to, href, onClick, children, text, ...passProp }) {
  let Comp = "button";

  const props = {
    onClick,
    ...passProp,
  };

  if (to) {
    props.to = to;
    Comp = Link;
  } else if (href) {
    props.href = href;
    Comp = "a";
  }

  let hoverButton;
  if (text) {
    hoverButton = classNames("hover:text-[text-primary]");
  }
  let button = classNames("button-comp min-w-[w-100] ", hoverButton);

  return (
    <Comp className={button} {...props}>
      {children}
    </Comp>
  );
}

export default Button;
