import { Assets, Container, Sprite, Texture } from "pixi.js";
import {
  type PropsWithChildren,
  useCallback,
  useEffect,
  useState,
} from "react";
import backgroundAsset from "../../../assets/space-stars.jpg";
import heroAsset from "../../../assets/hero.png";
import coinAssetGold from "../../../assets/coin-gold.png";
import coinAssetRed from "../../../assets/coin-red.png";
import { extend } from "@pixi/react";
import { Level } from "../../Levels/Level.tsx";
import { Hero } from "../../Hero/Hero.tsx";
import { TILE_SIZE } from "../../../constants/game-world.ts";
import { Camera } from "../../Camera/Camera.tsx";
import { Coin } from "../../Coins/Coins.tsx";

extend({ Sprite, Container, Texture });

interface IMainContainerProps {
  canvasSize: { width: number; height: number };
}

export const MainContainer = ({
  canvasSize,
  children,
}: PropsWithChildren<IMainContainerProps>) => {
  const [heroPosition, setHeroPosition] = useState({ x: 0, y: 0 });
  const [assets, setAssets] = useState<Record<string, Texture>>({});

  useEffect(() => {
    Assets.load([backgroundAsset, heroAsset, coinAssetGold, coinAssetRed]).then(
      (assets) => {
        setAssets(assets);
      },
    );
  }, []);

  const updateHeroPosition = useCallback((x: number, y: number) => {
    setHeroPosition({
      x: Math.floor(x / TILE_SIZE),
      y: Math.floor(y / TILE_SIZE),
    });
  }, []);

  return (
    <pixiContainer>
      <pixiSprite
        texture={assets[backgroundAsset] ?? undefined}
        width={canvasSize.width}
        height={canvasSize.height}
      ></pixiSprite>
      {children}
      <Camera heroPosition={heroPosition} canvasSize={canvasSize}>
        <Level></Level>
        <Hero texture={assets[heroAsset]} onMove={updateHeroPosition}></Hero>
        <Coin texture={assets[coinAssetGold]} x={5} y={10}></Coin>
        <Coin texture={assets[coinAssetGold]} x={7} y={11}></Coin>
        <Coin texture={assets[coinAssetGold]} x={9} y={20}></Coin>
      </Camera>
      {/* interface */}
      <Coin texture={assets[coinAssetRed]} x={2} y={1}></Coin>
      <Coin texture={assets[coinAssetRed]} x={3} y={1}></Coin>
      <Coin texture={assets[coinAssetRed]} x={4} y={1}></Coin>
    </pixiContainer>
  );
};
