import { extend } from "@pixi/react";
import { Assets, Sprite, Texture } from "pixi.js";
import { useEffect, useState } from "react";
import levelAsset from "../../assets/tilemap.png";
import {
  GAME_HEIGHT,
  GAME_WIDTH,
  OFFSET_X,
  OFFSET_Y,
} from "../../constants/game-world.ts";

extend({ Sprite });

export const Level = () => {
  const [texture, setTexture] = useState();

  useEffect(() => {
    Assets.load(levelAsset).then((texture) => {
      setTexture(texture);
    });
    Texture.from(levelAsset);
  }, []);

  return (
    <pixiSprite
      width={GAME_WIDTH}
      height={GAME_HEIGHT}
      texture={texture}
      x={OFFSET_X}
      y={OFFSET_Y}
    ></pixiSprite>
  );
};
