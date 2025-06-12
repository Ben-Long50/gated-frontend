import { useOutletContext } from 'react-router-dom';
import ThemeContainer from '../ThemeContainer';
import Modal from './Modal';
import { useContext } from 'react';
import { ThemeContext } from 'src/contexts/ThemeContext';
import Die1Icon from '../icons/Die1Icon';
import Icon from '@mdi/react';
import {
  mdiCheckCircleOutline,
  mdiCloseOutline,
  mdiTriangleDown,
} from '@mdi/js';
import Die2Icon from '../icons/Die2Icon';
import Die3Icon from '../icons/Die3Icon';
import Die4Icon from '../icons/Die4Icon';
import Die5Icon from '../icons/Die5Icon';
import Die6Icon from '../icons/Die6Icon';
import BtnRect from '../buttons/BtnRect';

const RollModal = () => {
  const { accentPrimary } = useContext(ThemeContext);
  const { rollForm, diceArray, rolling, successes } = useOutletContext() || {};

  return (
    <Modal>
      <h1>Roll Results</h1>
      <div className="scrollbar-primary-2 grid grid-cols-3 place-items-start overflow-y-auto">
        {diceArray.map((number: number, index) => {
          const modifiers = rollForm.getFieldValue('modifiers');
          const lucky =
            modifiers.includes('lucky') && !modifiers.includes('unlucky');
          const unlucky =
            modifiers.includes('unlucky') && !modifiers.includes('lucky');
          switch (number) {
            case 1:
              return (
                <div key={index} className="relative h-full w-full">
                  <Die1Icon className="text-primary" />
                  {!rolling &&
                    rollForm.getFieldValue('modifiers').includes('dooming') && (
                      <div className="absolute inset-3 flex items-center justify-center">
                        <Icon
                          path={mdiCloseOutline}
                          className="w-3/5 text-red-500"
                        />
                      </div>
                    )}
                </div>
              );
            case 2:
              return <Die2Icon key={index} className="text-primary w-full" />;
            case 3:
              return <Die3Icon key={index} className="text-primary w-full" />;
            case 4:
              return (
                <div key={index} className="relative h-full w-full">
                  <Die4Icon className="text-primary" />
                  {!rolling && lucky && (
                    <div className="absolute inset-3 flex items-center justify-center">
                      <Icon
                        path={mdiCheckCircleOutline}
                        className="w-3/5 text-green-500"
                      />
                    </div>
                  )}
                </div>
              );
            case 5:
              return (
                <div key={index} className="relative h-full w-full">
                  <Die5Icon className="text-primary" />
                  {!rolling && !unlucky && (
                    <div className="absolute inset-3 flex items-center justify-center">
                      <Icon
                        path={mdiCheckCircleOutline}
                        className="w-3/5 text-green-500"
                      />
                    </div>
                  )}
                </div>
              );
            case 6:
              return (
                <div key={index} className="relative h-full w-full">
                  <Die6Icon className="text-primary" />
                  {!rolling &&
                    (!modifiers.includes('booming') ? (
                      <div className="absolute inset-3 flex items-center justify-center">
                        <Icon
                          path={mdiCheckCircleOutline}
                          className="w-3/5 text-green-500"
                        />
                      </div>
                    ) : (
                      <div className="absolute inset-3">
                        <Icon
                          path={mdiCheckCircleOutline}
                          className="absolute left-0 top-0 w-3/5 text-green-500"
                        />
                        <Icon
                          path={mdiCheckCircleOutline}
                          className="absolute bottom-0 right-0 w-3/5 text-green-500"
                        />
                      </div>
                    ))}
                </div>
              );
            default:
              return;
          }
        })}
      </div>
      <div className="flex w-full flex-col gap-4">
        {!rolling && (
          <div className="grid grid-cols-[auto_auto_1fr] gap-x-8 gap-y-4">
            <h2>Successes</h2>
            <Icon
              className="text-primary place-self-center"
              path={mdiTriangleDown}
              size={0.5}
              rotate={-90}
            />
            <h2>{successes}</h2>
            <h2>Success Rate</h2>
            <Icon
              className="text-primary place-self-center"
              path={mdiTriangleDown}
              size={0.5}
              rotate={-90}
            />
            <h2>
              {Math.floor((successes / diceArray.length) * 100 || 0) + '%'}
            </h2>
          </div>
        )}
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
    </Modal>
  );
};

export default RollModal;
