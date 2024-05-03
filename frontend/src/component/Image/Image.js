import { forwardRef, useState } from "react";
import images from "../assest/images";

const Image = forwardRef(({ src, alt, id = "", ...props }, ref) => {
  const [fallback, setFallback] = useState("");

  const handleError = () => {
    setFallback(images.noImage);
  };

  return (
    <img
      ref={ref}
      alt={alt}
      src={src || fallback}
      id={id}
      {...props}
      onError={() => {
        setFallback(images.noImage);
      }}
    />
  );
});

export default Image;
