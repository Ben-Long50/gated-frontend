import { ReactNode } from 'react';

const StatBar = ({
  title,
  total,
  current,
  reserve,
  color,
  mode,
  children,
  mutation,
  cardWidth,
}: {
  title?: string;
  total?: number;
  reserve?: number;
  current: number;
  color: string;
  mode?: string;
  children: ReactNode;
  mutation?: (value: number) => void;
  cardWidth: number;
}) => {
  const small = cardWidth < 500;

  const arrayLength = (() => {
    let divider = 1;
    if (current > 50 && current <= 100) {
      divider = 2;
    } else if (current > 100 && current <= 150) {
      divider = 3;
    } else if (current > 150 && current <= 250) {
      divider = 4;
    } else if (current > 250) {
      divider = 5;
    }
    if (total) {
      return total > current
        ? Math.floor(divider ? total / divider : total)
        : Math.floor(divider ? current / divider : current);
    } else {
      return Math.floor(divider ? current / divider : current);
    }
  })();

  return (
    <>
      {title && (small ? null : <h4>{title}</h4>)}
      {children}
      <div
        className={`${small ? 'col-span-3 gap-2' : 'col-span-2 gap-4'} grid w-full grid-cols-[1fr_auto] items-center justify-between`}
      >
        <div className={`flex w-full items-center rounded`} style={{}}>
          {Array.from({
            length: arrayLength,
          }).map((_, index) => (
            <div
              key={index}
              className={`${index === 0 && 'rounded-l-sm border-l-[1px]'} ${index === arrayLength - 1 && 'rounded-r-sm border-r-[1px]'} ${total && index >= total && 'ring-[3px] ring-inset ring-red-600'} h-4 w-full min-w-[1px] max-w-8 grow border-b-[1px] border-l-[0.5px] border-r-[0.5px] border-t-[1px] border-black`}
              style={{
                backgroundImage:
                  index < current
                    ? `linear-gradient(to bottom, rgb(160, 160, 160), ${color}, rgb(50, 50, 50)`
                    : 'none',
                backgroundColor: index < current ? undefined : 'gray',
              }}
            />
          ))}
        </div>
        {mode !== 'edit' && (
          <div
            className={`${small ? 'gap-1' : 'gap-2'} text-tertiary z-20 flex items-center whitespace-nowrap text-xl`}
          >
            <div
              className={`${mutation && 'hover:text-accent cursor-pointer'} text-secondary grid h-6 min-w-6 place-content-center`}
              onClick={mutation ? () => mutation(-1) : undefined}
            >
              <p
                className={`${total && current > total ? 'text-error' : '!text-inherit'}`}
              >
                {current}
              </p>
            </div>
            {(reserve || total) && (
              <>
                <p>/</p>
                <div
                  className={`${mutation && 'hover:text-accent cursor-pointer'} text-secondary grid h-6 min-w-6 place-content-center`}
                  onClick={mutation ? () => mutation(1) : undefined}
                >
                  <p className="!text-inherit">
                    {reserve !== undefined ? reserve : total}
                  </p>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default StatBar;
