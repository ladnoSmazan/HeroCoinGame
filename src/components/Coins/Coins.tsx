import { Texture } from "pixi.js";
import { useRef } from "react";
import {
  COINS_ANIMATION_SPEED,
  TILE_SIZE,
} from "../../constants/game-world.ts";
import { useTick } from "@pixi/react";
import { useCoinsAnimation } from "./useCoinsAnimation.tsx";

interface ICoinsProp {
  texture: Texture | null;
  x: number;
  y: number;
}

export const Coin = ({ texture, x, y }: ICoinsProp) => {
  const rotation = useRef(0);

  const { sprite, updateSprite } = useCoinsAnimation({
    texture,
    frameWidth: 16,
    frameHeight: 16,
    totalFrames: 5,
    animationSpeed: COINS_ANIMATION_SPEED,
  });

  useTick((delta) => {
    updateSprite(delta.deltaTime);
  });

  return (
    <pixiContainer
      rotation={rotation.current}
      x={x * TILE_SIZE}
      y={y * TILE_SIZE}
    >
      {sprite && (
        <pixiSprite
          texture={sprite.texture}
          scale={0.7}
          anchor={{ x: -0.85, y: -0.75 }}
        ></pixiSprite>
      )}
    </pixiContainer>
  );
};
