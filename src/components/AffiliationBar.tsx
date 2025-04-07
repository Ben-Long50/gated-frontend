import { FieldApi } from '@tanstack/react-form';
import { useState } from 'react';

const AffiliationBar = ({ field }: { field: FieldApi }) => {
  const [hoverValue, setHoverValue] = useState<number | null>(null);
  return (
    <div className="flex w-full flex-col gap-4">
      <div className="grid grid-cols-11 place-items-center">
        {Array.from({ length: 11 }).map((_, index) => (
          <div
            key={index}
            className={`${field.state.value === index - 5 && 'bg-tertiary border-[2px] border-yellow-300 border-opacity-50'} flex size-8 items-center justify-center rounded-lg text-base font-semibold`}
          >
            <p className="text-base font-bold">{index - 5}</p>
          </div>
        ))}
      </div>
      <div className="grid h-4 w-full grid-cols-11 rounded bg-gradient-to-r from-red-600 via-yellow-300 to-green-500">
        {Array.from({ length: 11 }).map((_, index) => (
          <button
            key={index}
            className={`${index === 10 && 'rounded-r'} ${index === 0 && 'rounded-l'} relative ${field.state.value < index - 5 && 'bg-zinc-500'} ${hoverValue && hoverValue >= index && 'bg-opacity-60'} w-full ${hoverValue && hoverValue < index && field.state.value >= index - 5 && 'bg-zinc-500 bg-opacity-60'} timing`}
            onMouseEnter={() => setHoverValue(index)}
            onMouseLeave={() => setHoverValue(null)}
            onClick={(e) => {
              e.preventDefault();
              field.handleChange(index - 5);
            }}
          ></button>
        ))}
      </div>
      <div className="flex w-full items-center justify-between">
        <p className="text-tertiary">Aggressive</p>
        <p className="text-tertiary">Neutral</p>
        <p className="text-tertiary">Benevolent</p>
      </div>
    </div>
  );
};

export default AffiliationBar;
