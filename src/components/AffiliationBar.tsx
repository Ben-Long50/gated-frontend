import { mdiTriangleDown } from '@mdi/js';
import Icon from '@mdi/react';
import { FieldApi } from '@tanstack/react-form';
import { useState } from 'react';

const AffiliationBar = ({
  field,
  value,
  className,
  onClick,
}: {
  field?: FieldApi;
  value?: number;
  className?: string;
  onClick?: (value: number) => void;
}) => {
  const [hoverValue, setHoverValue] = useState<number | null>(null);

  const affiliationValue = field?.state?.value ?? value;

  const activeBar = field || onClick;

  return (
    <div className={`${className} flex w-full flex-col`}>
      <div className="flex items-center justify-between">
        {Array.from({ length: 11 }).map((_, index) => (
          <div
            key={index}
            className={`flex h-8 w-0 items-center justify-center rounded-lg text-center text-base font-semibold`}
          >
            <p
              className={`${affiliationValue === index - 5 && 'text-accent !text-3xl'} timing text-base font-bold`}
            >
              {index - 5}
            </p>
          </div>
        ))}
      </div>
      <div className="w-full">
        <div className="my-4 grid h-5 w-full grid-cols-10 rounded bg-gradient-to-r from-red-600 via-yellow-300 to-green-500">
          {Array.from({ length: 10 }).map((_, index) => (
            <button
              key={index}
              className={`${index === 9 && 'rounded-r'} ${index === 0 && 'rounded-l'} relative ${affiliationValue < index - 4 && 'bg-zinc-500'} ${hoverValue !== null && hoverValue >= index && activeBar && 'bg-opacity-60'} w-full ${hoverValue !== null && hoverValue < index && affiliationValue >= index - 4 && activeBar && 'bg-zinc-500 bg-opacity-60'} ${!activeBar && 'cursor-default'} timing`}
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const isLeftHalf = e.clientX < rect.left + rect.width / 2;
                setHoverValue(isLeftHalf ? index - 1 : index);
              }}
              onMouseLeave={() => setHoverValue(null)}
              onClick={(e) => {
                e.preventDefault();
                const rect = e.currentTarget.getBoundingClientRect();
                const isLeftHalf = e.clientX < rect.left + rect.width / 2;
                const newValue = isLeftHalf ? index - 5 : index - 4;
                if (!value && field) {
                  field.handleChange(newValue);
                }
                if (onClick) {
                  onClick(newValue);
                }
              }}
            >
              {affiliationValue === index - 4 && (
                <div className="absolute right-0 top-0 z-10 -translate-y-2 translate-x-1/2">
                  <Icon
                    className="text-accent"
                    path={mdiTriangleDown}
                    size={0.75}
                  />
                </div>
              )}
              {hoverValue === index && field && (
                <div className="absolute right-0 top-0 z-10 -translate-y-2 translate-x-1/2">
                  <Icon
                    className="text-accent opacity-50"
                    path={mdiTriangleDown}
                    size={0.75}
                  />
                </div>
              )}
            </button>
          ))}
        </div>
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
