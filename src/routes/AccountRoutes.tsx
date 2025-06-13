import { Route } from 'react-router-dom';
import AccountPreferences from 'src/components/AccountPreferences';
import AccountSettingsForm from 'src/components/AccountSettingsForm';
import ErrorReport from 'src/components/ErrorReport';
import ErrorReports from 'src/components/ErrorReports';
import Notifications from 'src/components/Notifications';
import PatchNoteForm from 'src/components/PatchNotesForm';
import UserRoles from 'src/components/UserRoles';

const AccountRoutes = () => {
  return (
    <Route path="account/:userId">
      <Route index element={<AccountSettingsForm />} />
      <Route path="notifications" element={<Notifications />} />
      <Route path="preferences" element={<AccountPreferences />} />
      <Route path="adminTools" element={<ErrorReports />} />
      <Route path="userPermissions" element={<UserRoles />} />
      <Route path="errorReport" element={<ErrorReport />} />
      <Route path="patchNotes">
        <Route path="create" element={<PatchNoteForm />} />
      </Route>
    </Route>
  );
};

export default AccountRoutes;
