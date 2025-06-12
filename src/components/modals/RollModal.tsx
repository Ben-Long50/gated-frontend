import { useOutletContext } from 'react-router-dom';
import Modal from './Modal';
import Die1Icon from '../icons/Die1Icon';
import Die2Icon from '../icons/Die2Icon';
import Die3Icon from '../icons/Die3Icon';
import Die4Icon from '../icons/Die4Icon';
import Die5Icon from '../icons/Die5Icon';
import Die6Icon from '../icons/Die6Icon';
import BtnRect from '../buttons/BtnRect';
import ThemeContainer from '../ThemeContainer';
import { useContext } from 'react';
import { ThemeContext } from 'src/contexts/ThemeContext';
import Loading from '../Loading';
import ArrowHeader2 from '../ArrowHeader2';
import { LayoutContext } from 'src/contexts/LayoutContext';

const RollModal = () => {
  const { accentPrimary } = useContext(ThemeContext);
  const { mobile } = useContext(LayoutContext);
  const { rollForm, diceArray, rolling, successes } = useOutletContext() || {};

  return (
    <Modal className="h-full">
      <h1>Roll Results</h1>
      <div className="scrollbar-primary-2 grid grid-cols-3 gap-4 overflow-y-auto sm:gap-12">
        {diceArray.map((number: number, index) => {
          const modifiers = rollForm.getFieldValue('modifiers');
          const lucky =
            modifiers.includes('lucky') && !modifiers.includes('unlucky');
          const unlucky =
            modifiers.includes('unlucky') && !modifiers.includes('lucky');
          switch (number) {
            case 1:
              return (
                <Die1Icon
                  key={index}
                  className={`${!rolling && modifiers.includes('dooming') ? 'fill-red-500' : 'fill-gray-200'} h-full w-full`}
                />
              );
            case 2:
              return (
                <Die2Icon key={index} className="h-full w-full fill-gray-200" />
              );
            case 3:
              return (
                <Die3Icon key={index} className="h-full w-full fill-gray-200" />
              );
            case 4:
              return (
                <Die4Icon
                  key={index}
                  className={`${!rolling && lucky ? 'fill-green-500' : 'fill-gray-200'} h-full w-full`}
                />
              );
            case 5:
              return (
                <Die5Icon
                  key={index}
                  className={`${!rolling && !unlucky ? 'fill-green-500' : 'fill-gray-200'} h-full w-full`}
                />
              );
            case 6:
              return (
                <Die6Icon
                  key={index}
                  className={`${!rolling && modifiers.includes('booming') ? 'fill-yellow-400' : !rolling && !modifiers.includes('booming') ? 'fill-green-500' : 'fill-gray-200'} h-full w-full`}
                />
              );
            default:
              return;
          }
        })}
      </div>
      <div className="absolute bottom-0 w-full p-4 sm:p-8">
        <ThemeContainer borderColor={accentPrimary} chamfer="medium">
          <div className="flex w-full flex-col gap-4 p-4 sm:p-8">
            <div className="grid grid-cols-[1fr_auto] gap-y-4">
              <ArrowHeader2 title="Successes" />
              {!rolling ? (
                <h2 className="justify-self-end">{successes}</h2>
              ) : (
                <Loading
                  className="text-accent ml-auto justify-self-end"
                  size={mobile ? 1.3 : 1.5}
                />
              )}
              <ArrowHeader2 title="Success Rate" />
              {!rolling ? (
                <h2 className="justify-self-end">
                  {Math.floor((successes / diceArray.length) * 100 || 0) + '%'}
                </h2>
              ) : (
                <Loading
                  className="text-accent ml-auto justify-self-end"
                  size={mobile ? 1.3 : 1.5}
                />
              )}
            </div>

            <BtnRect
              type="button"
              ariaLabel="Reroll"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                rollForm.handleSubmit();
              }}
            >
              Reroll
            </BtnRect>
          </div>
        </ThemeContainer>
      </div>
    </Modal>
  );
};

export default RollModal;
