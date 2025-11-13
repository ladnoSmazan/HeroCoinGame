import { COLS, TILE_SIZE } from "../constants/game-world.ts";
import { COLLISION_MAP } from "../constants/collision-map.ts";

export interface IPosition {
  x: number;
  y: number;
}

export type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT" | undefined;

export const DIRECTION_KEYS: Record<string, Direction> = {
  KeyW: "UP",
  KeyS: "DOWN",
  KeyD: "RIGHT",
  KeyA: "LEFT",
};

export const calculateNewTarget = (
  x: number,
  y: number,
  direction: Direction,
) => {
  return {
    x:
      (x / TILE_SIZE) * TILE_SIZE +
      (direction === "LEFT"
        ? -TILE_SIZE
        : direction === "RIGHT"
          ? TILE_SIZE
          : 0),
    y:
      (y / TILE_SIZE) * TILE_SIZE +
      (direction === "UP" ? -TILE_SIZE : direction === "DOWN" ? TILE_SIZE : 0),
  };
};

export const checkCanMove = (target: IPosition) => {
  const row: number = Math.floor(target.y / TILE_SIZE);
  const col: number = Math.floor(target.x / TILE_SIZE);
  const index: number = COLS * row + col;

  if (index < 0 || index >= COLLISION_MAP.length) {
    return false;
  }

  return COLLISION_MAP[index] !== 1;
};

const moveTowards = (current: number, target: number, nextStep: number) => {
  return (
    current +
    Math.sign(target - current) * Math.min(Math.abs(target - current), nextStep)
  );
};

const continueMovement = (
  currentPosition: IPosition,
  targetPosition: IPosition,
  step: number,
): IPosition => {
  return {
    x: moveTowards(currentPosition.x, targetPosition.x, step),
    y: moveTowards(currentPosition.y, targetPosition.y, step),
  };
};

export const handleMovement = (
  currentPosition: IPosition,
  targetPosition: IPosition,
  moveSpeed: number,
  delta: number,
) => {
  const step = moveSpeed * TILE_SIZE * delta;
  const distance = Math.hypot(
    targetPosition.x - currentPosition.x,
    targetPosition.y - currentPosition.y,
  );

  if (distance <= step) {
    return {
      position: targetPosition,
      completed: true,
    };
  }

  return {
    position: continueMovement(currentPosition, targetPosition, step),
    completed: false,
  };
};

export const lerp = (start: number, end: number) => {
  return start + (end - start) * 0.03;
};
