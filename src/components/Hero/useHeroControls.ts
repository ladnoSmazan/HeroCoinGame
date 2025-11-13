import { useCallback, useEffect, useState } from "react";
import { type Direction, DIRECTION_KEYS } from "../../types/common.ts";

export const useHeroControls = () => {
  const [heldDirection, setHeldDirection] = useState<Direction[]>([]);

  const handleKey = useCallback((event: KeyboardEvent, isKeyDown: boolean) => {
    const directionKey: Direction = DIRECTION_KEYS[event.code];
    if (!directionKey) {
      return;
    }
    setHeldDirection((prevState) => {
      if (isKeyDown) {
        return prevState.includes(directionKey) ? prevState : [directionKey];
      }
      return prevState.filter((dir) => dir !== directionKey);
    });
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => handleKey(event, true);
    const handleKeyUp = (event: KeyboardEvent) => handleKey(event, false);

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [handleKey]);

  const getControlDirection = useCallback(() => {
    return heldDirection[0] ?? null;
  }, [heldDirection]);

  return { getControlDirection };
};
