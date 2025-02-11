import { useContext } from 'react';
import ThemeContainer from '../components/ThemeContainer';
import { ThemeContext } from '../contexts/ThemeContext';
import Icon from '@mdi/react';
import { mdiAlertOutline } from '@mdi/js';

const FormLayout = ({
  children,
  itemId,
  createMutation,
  deleteMutation,
  handleDelete,
  handleReset,
  formMessage,
  deleteMode,
  setDeleteMode,
}) => {
  const { accentPrimary } = useContext(ThemeContext);
  return (
    <ThemeContainer
      className="mb-auto w-full max-w-5xl rounded-br-5xl rounded-tl-5xl shadow-xl shadow-slate-950"
      chamfer="32"
      borderColor={accentPrimary}
    >
      <div className="bg-primary flex w-full min-w-96 flex-col gap-8 p-4 clip-8 sm:p-8">
        {children}
        {itemId && (
          <div className="flex flex-col gap-4">
            <div className="flex w-full items-center justify-between gap-8">
              <button
                className="text-accent hover:underline"
                onClick={handleDelete}
              >
                Delete
              </button>
              {deleteMode && (
                <div className="grow">
                  <button
                    className="text-secondary text-left hover:underline"
                    onClick={() => setDeleteMode(false)}
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
                  Press the delete button one more time to permenantly delete
                </p>
              </div>
            )}
          </div>
        )}
        {formMessage && (
          <div className="flex w-full items-center justify-between">
            {(createMutation.isPending || deleteMutation.isPending) && (
              <p>Submitting...</p>
            )}
            {(createMutation.isSuccess || deleteMutation.isSuccess) && (
              <p>{formMessage}</p>
            )}
            {(createMutation.isError || deleteMutation.isError) && (
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
