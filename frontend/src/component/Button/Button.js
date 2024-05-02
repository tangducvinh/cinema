import { Link } from "react-router-dom";
import classNames from "classnames";
function Button({
  to,
  href,
  onClick,
  children,
  text,
  primary,
  outline,
  big,
  small,
  icon,
  leftIcon,
  rightIcon,
  ...passProp
}) {
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
  if (primary) {
    hoverButton = classNames(
      "bg-[-button-primary] border-none text-white hover:opacity-90 mr-2 "
    );
  }
  if (outline) {
    hoverButton = classNames("border-yellow-600 text-yellow-600 mr-0 ");
  }

  if (small && primary) {
    hoverButton = classNames(
      "bg-[-button-primary] border-none text-white hover:opacity-90 w-32"
    );
  }
  if (small && outline) {
    hoverButton = classNames(
      "border-yellow-600 text-yellow-600 mr-0 w-32 hover:bg-[-button-primary] hover:text-white"
    );
  }

  if (big && primary) {
    hoverButton = classNames(
      "bg-[-button-primary] border-none text-white hover:opacity-90 w-full"
    );
  }
  if (big && outline) {
    hoverButton = classNames(
      "border-yellow-600 text-yellow-600 mr-0 w-full hover:bg-[-button-primary] hover:text-white"
    );
  }
  let button = classNames(
    "button-comp min-w-[w-100] rounded border border-solid border-[-gray-button] h-9 flex items-center justify-center px-2 py-2",
    hoverButton
  );
  if (icon) {
    button = classNames("ml-3 px-1", hoverButton);
  }
  return (
    <Comp className={button} {...props}>
      {leftIcon && <span>{leftIcon}</span>}
      <span>{children}</span>
      {rightIcon && <span>{rightIcon}</span>}
    </Comp>
  );
}

export default Button;
