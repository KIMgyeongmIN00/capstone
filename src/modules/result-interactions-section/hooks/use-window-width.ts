import { useEffect, useState } from "react";

export const useWindowWidth = () => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const updateSize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return width;
};
