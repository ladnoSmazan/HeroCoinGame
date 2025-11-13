import { Container, Sprite, Texture } from "pixi.js";
import { extend, useTick } from "@pixi/react";
import { useCallback, useEffect, useRef } from "react";
import {
  DEFAULT_POS_X,
  DEFAULT_POS_Y,
  HERO_ANIMATION_SPEED,
  MOVE_SPEED,
} from "../../constants/game-world.ts";
import { useHeroControls } from "./useHeroControls.ts";
import {
  calculateNewTarget,
  checkCanMove,
  type Direction,
  handleMovement,
  type IPosition,
} from "../../types/common.ts";
import { useHeroAnimation } from "./useHeroAnimation.ts";

extend({ Sprite, Container, Texture });

interface IHeroProps {
  texture: Texture | null;
  onMove: (gridX: number, gridY: number) => void;
}

export const Hero = ({ texture, onMove }: IHeroProps) => {
  const position = useRef<IPosition>({ x: DEFAULT_POS_X, y: DEFAULT_POS_Y });
  const targetPosition = useRef<IPosition>(null);
  const currentDirection = useRef<Direction>(null);
  const direction = useHeroControls().getControlDirection();
  const isMoving = useRef(false);
  const { sprite, updateSprite } = useHeroAnimation({
    texture,
    frameHeight: 64,
    frameWidth: 64,
    totalFrames: 9,
    animationSpeed: HERO_ANIMATION_SPEED,
  });

  useEffect(() => {
    onMove(position.current.x, position.current.y);
  }, [onMove]);

  const setNextTarget = useCallback((direction: Direction) => {
    if (targetPosition.current) return;
    const { x, y } = position.current;
    currentDirection.current = direction;
    const newTarget = calculateNewTarget(x, y, direction);

    if (checkCanMove(newTarget)) {
      targetPosition.current = newTarget;
    }
  }, []);

  useTick((delta) => {
    if (direction) {
      setNextTarget(direction);
    }

    if (targetPosition.current) {
      const { completed, position: newPosition } = handleMovement(
        position.current,
        targetPosition.current,
        MOVE_SPEED,
        delta.deltaTime,
      );

      position.current = newPosition;

      if (completed) {
        const { x, y } = position.current;
        onMove(x, y);
        targetPosition.current = null;
        isMoving.current = true;
      }
    }

    updateSprite(currentDirection.current, isMoving.current);
  });

  return (
    <pixiContainer>
      {sprite && (
        <pixiSprite
          texture={sprite.texture ?? undefined}
          x={position.current.x}
          y={position.current.y}
          scale={0.5}
          anchor={{ x: 1, y: 0.8 }}
        ></pixiSprite>
      )}
    </pixiContainer>
  );
};
