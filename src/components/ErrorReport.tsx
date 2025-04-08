import { useNavigate } from 'react-router-dom';
import BtnRect from './buttons/BtnRect';
import { useForm } from '@tanstack/react-form';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import FormLayout from '../layouts/FormLayout';
import InputField from './InputField';
import useCreateErrorReportMutation from '../hooks/useCreateErrorReportMutation/useCreateErrorReportMutation';
import TextAreaField from './TextAreaField';
import Loading from './Loading';

const ErrorReport = () => {
  const { apiUrl } = useContext(AuthContext);
  const navigate = useNavigate();
  const createErrorReport = useCreateErrorReportMutation(apiUrl);

  const errorReportForm = useForm({
    defaultValues: {
      title: '',
      content: '',
    },
    onSubmit: async ({ value }) => {
      await createErrorReport.mutate(value);
    },
  });

  return (
    <div className="flex w-full items-center">
      <div className="mx-auto my-auto flex w-full max-w-4xl flex-col items-center justify-center gap-4 p-2 sm:gap-8 sm:p-8">
        <FormLayout>
          <form
            className="bg-primary flex w-full flex-col gap-4 p-0.5 sm:gap-8"
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              errorReportForm.handleSubmit();
            }}
          >
            <h1 className="text-center">Error Report</h1>
            <errorReportForm.Field
              name="title"
              validators={{
                onSubmit: ({ value }) =>
                  value.length < 2 ? 'You gotta have a title' : undefined,
              }}
            >
              {(field) => <InputField label="Title" field={field} />}
            </errorReportForm.Field>
            <errorReportForm.Field
              name="content"
              validators={{
                onChange: ({ value }) =>
                  value.length < 10
                    ? 'Tell me something substantial'
                    : undefined,
                onSubmit: ({ value }) =>
                  value.length > 500
                    ? "Ok that's too many words calm down"
                    : undefined,
              }}
            >
              {(field) => (
                <TextAreaField
                  className="h-60 w-full"
                  label="Describe the error"
                  field={field}
                />
              )}
            </errorReportForm.Field>
            <errorReportForm.Subscribe
              selector={(state) => [state.values.content]}
            >
              {([content]) => (
                <p className="text-tertiary self-end text-base">{`${content.length} / 500`}</p>
              )}
            </errorReportForm.Subscribe>
            <BtnRect type="submit" className="group w-full min-w-40">
              {createErrorReport.isPending ? (
                <Loading
                  className="group-hover:text-yellow-300 dark:text-gray-900"
                  size={1.15}
                />
              ) : (
                'Submit'
              )}
            </BtnRect>
          </form>
        </FormLayout>
      </div>
    </div>
  );
};

export default ErrorReport;
