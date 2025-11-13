import { Application } from "@pixi/react";
import { useCallback, useEffect, useState } from "react";
import { calculateCanvasSize } from "../../helpers/canvas-size.ts";
import { MainContainer } from "./MainContainer/MainContainer.tsx";

export const Experience = () => {
  const [canvasSize, setCanvasSize] = useState(calculateCanvasSize);

  const updateCanvasSize = useCallback(() => {
    setCanvasSize(calculateCanvasSize());
  }, []);

  useEffect(() => {
    window.addEventListener("resize", updateCanvasSize);
    return () => {
      window.removeEventListener("resize", updateCanvasSize);
    };
  }, [updateCanvasSize]);

  return (
    <Application width={canvasSize.width} height={canvasSize.height}>
      <MainContainer canvasSize={canvasSize}></MainContainer>
    </Application>
  );
};
