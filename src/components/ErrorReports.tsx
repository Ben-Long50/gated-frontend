import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import useErrorReportsQuery from '../hooks/useErrorReportsQuery/useErrorReportsQuery';
import Loading from './Loading';
import { ErrorReport } from 'src/types/errorReport';
import { format } from 'date-fns';
import { ThemeContext } from '../contexts/ThemeContext';
import ThemeContainer from './ThemeContainer';
import useDeleteErrorReportMutation from '../hooks/useDeleteErrorReportMutation/useDeleteErrorReportMutation';

const ErrorReports = () => {
  const { apiUrl } = useContext(AuthContext);
  const { accentPrimary } = useContext(ThemeContext);
  const {
    data: errorReports,
    isLoading,
    isPending,
  } = useErrorReportsQuery(apiUrl);

  const deleteErrorReport = useDeleteErrorReportMutation(apiUrl);

  if (isLoading || isPending) return <Loading />;

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-8">
      <h1 className="text-center">Error Reports</h1>
      {errorReports?.map((report: ErrorReport) => {
        return (
          <ThemeContainer
            key={report.id}
            className="mb-auto w-full max-w-5xl"
            chamfer="medium"
            borderColor={accentPrimary}
          >
            <div className="flex flex-col gap-4 p-4">
              <div className="flex w-full items-end justify-between">
                <h3 className="pl-4">{report.title}</h3>
                <p>{report.user.firstName + ' ' + report.user.lastName}</p>
              </div>
              <p>{format(report.createdAt, 'PP')}</p>
              <p>{report.content}</p>
              <button
                className="text-accent self-end pr-4 hover:underline"
                onClick={() => {
                  deleteErrorReport.mutate(report.id);
                }}
              >
                {deleteErrorReport.isPending ? <Loading size={1} /> : 'Delete'}
              </button>
            </div>
          </ThemeContainer>
        );
      })}
    </div>
  );
};

export default ErrorReports;
