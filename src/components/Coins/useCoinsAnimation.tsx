import { Rectangle, Sprite, Texture } from "pixi.js";
import { useRef, useState } from "react";

interface IUseCoinAnimationProps {
  texture: Texture | null;
  frameWidth: number;
  frameHeight: number;
  totalFrames: number;
  animationSpeed: number;
}

export const useCoinsAnimation = ({
  texture,
  frameHeight,
  frameWidth,
  totalFrames,
  animationSpeed,
}: IUseCoinAnimationProps) => {
  const [currentTexture, setCurrentTexture] = useState(
    new Texture({
      source: texture?.source,
      frame: new Rectangle(0, 0, frameWidth, frameHeight),
    }),
  );

  const spriteRef = useRef<Sprite>(new Sprite(currentTexture));
  const frameRef = useRef(0);
  const elapsedTimeRef = useRef(0);

  const updateSprite = (delta: number) => {
    elapsedTimeRef.current += delta;

    const frameDuration = 1 / animationSpeed;

    if (elapsedTimeRef.current >= frameDuration) {
      elapsedTimeRef.current = 0;
      frameRef.current = (frameRef.current + 1) % totalFrames;

      const newFrame = new Rectangle(
        frameRef.current * frameWidth,
        0,
        frameWidth,
        frameHeight,
      );

      const newTexture = new Texture({
        source: texture?.source,
        frame: newFrame,
      });
      spriteRef.current.texture = newTexture;
      setCurrentTexture(newTexture);
    }
  };

  return {
    sprite: spriteRef.current,
    updateSprite,
  };
};
