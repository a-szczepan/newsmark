import { useEffect, useState } from "react";

export const useWidthChecker = () => {
  const [screenWidth, setScreenWidth] = useState<number>(window.innerWidth);
  useEffect(() => {
    window.addEventListener("resize", () => setScreenWidth(window.innerWidth));
  }, []);

  return screenWidth;
};