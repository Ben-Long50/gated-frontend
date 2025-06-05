import { ReactNode, useContext } from 'react';
import ThemeContainer from '../components/ThemeContainer';
import { ThemeContext } from '../contexts/ThemeContext';
import Icon from '@mdi/react';
import { mdiAlertOutline } from '@mdi/js';
import { UseMutationResult } from '@tanstack/react-query';

type MutationType<TData = any, TVariables = any> = UseMutationResult<
  TData,
  unknown,
  TVariables
>;

const FormLayout = ({
  children,
  itemId,
  createMutation,
  modifyMutation,
  deleteMutation,
  handleDelete,
  handleReset,
  formMessage,
  deleteMode,
  setDeleteMode,
}: {
  children: ReactNode;
  itemId?: string;
  createMutation?: MutationType;
  modifyMutation?: MutationType;
  deleteMutation?: MutationType;
  handleDelete?: () => void;
  handleReset?: () => void;
  formMessage?: string;
  deleteMode?: boolean;
  setDeleteMode?: (value: boolean) => void;
}) => {
  const { accentPrimary } = useContext(ThemeContext);

  const isPending =
    createMutation?.isPending ||
    modifyMutation?.isPending ||
    deleteMutation?.isPending;

  const isSuccess =
    createMutation?.isSuccess ||
    modifyMutation?.isSuccess ||
    deleteMutation?.isSuccess;

  const isError =
    createMutation?.isError ||
    modifyMutation?.isError ||
    deleteMutation?.isError;

  return (
    <ThemeContainer
      className="mb-auto w-full max-w-5xl"
      chamfer="large"
      borderColor={accentPrimary}
    >
      <div className="flex w-full min-w-96 flex-col gap-8 p-4 sm:p-8">
        {children}
        {itemId && (
          <div className="flex flex-col gap-4">
            <div className="flex w-full items-center justify-between gap-8">
              {deleteMutation && (
                <button
                  className="text-accent hover:underline"
                  onClick={handleDelete}
                >
                  Delete
                </button>
              )}
              {deleteMode && (
                <div className="grow">
                  <button
                    className="text-secondary text-left hover:underline"
                    onClick={() => setDeleteMode && setDeleteMode(false)}
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
            {deleteMode && (
              <div className="flex items-center gap-4">
                <Icon
                  className="text-error"
                  path={mdiAlertOutline}
                  size={1.5}
                />
                <p className="text-error text-base">
                  Press the delete button one more time to permanently delete
                </p>
              </div>
            )}
          </div>
        )}
        {formMessage && (
          <div className="flex w-full items-center justify-between">
            {isPending && <p>Submitting...</p>}
            {isSuccess && <p>{formMessage}</p>}
            {isError && (
              <p>
                Error: <span className="text-error">{formMessage}</span>
              </p>
            )}
            <button
              className="text-accent text-xl hover:underline"
              onClick={handleReset}
            >
              Reset form
            </button>
          </div>
        )}
      </div>
    </ThemeContainer>
  );
};

export default FormLayout;
