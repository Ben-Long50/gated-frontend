import { useRef, useState } from 'react';

const useRoll = () => {
  const [diceArray, setDiceArray] = useState<number[]>([]);
  const [rolling, setRolling] = useState(false);
  const [successes, setSuccesses] = useState(<number | null>null);

  const timeoutRef = useRef<number | null>(null);

  const rollDice = (
    diceCount: number,
    onFinish?: (result: number[]) => void,
  ) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    let count = 1;
    const maxRolls = 18;

    setRolling(true);

    const rollOnce = () => {
      const dieArray = Array.from(
        { length: diceCount },
        () => Math.floor(Math.random() * 6) + 1,
      );

      setDiceArray(dieArray);

      count++;
      if (count >= maxRolls) {
        setRolling(false);
        onFinish?.(dieArray);
        return;
      }

      const delay = count * 10;

      timeoutRef.current = setTimeout(rollOnce, delay);
    };

    rollOnce();
  };

  const calculateSuccesses = (diceCount: number, modifiers: string[]) => {
    rollDice(diceCount, (result) => {
      let successes = 0;
      successes += result.filter((number) => number >= 5).length;
      if (modifiers.includes('booming')) {
        successes += result.filter((number) => number === 6).length;
      }
      if (modifiers.includes('dooming')) {
        successes -= result.filter((number) => number === 1).length;
      }
      if (modifiers.includes('lucky') && !modifiers.includes('unlucky')) {
        successes += result.filter((number) => number === 4).length;
      }
      if (modifiers.includes('unlucky') && !modifiers.includes('lucky')) {
        successes -= result.filter((number) => number === 5).length;
      }
      setSuccesses(successes);
    });
  };

  return {
    diceArray,
    setDiceArray,
    rolling,
    calculateSuccesses,
    successes,
  };
};

export default useRoll;
