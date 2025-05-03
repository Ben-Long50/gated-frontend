import { Route } from 'react-router-dom';
import Cart from 'src/components/Cart';
import CharacterSheet from 'src/components/CharacterSheet';
import CharacterUpdateForm from 'src/components/CharacterUpdateForm';
import Notes from 'src/components/Notes';
import NotesForm from 'src/components/NotesForm';
import Resume from 'src/components/Resume';
import ResumeForm from 'src/components/ResumeForm';
import Session from 'src/components/Session';
import SessionForm from 'src/components/SessionForm';

const SessionRoutes = () => {
  return (
    <Route path="sessions">
      <Route path=":sessionId">
        <Route index element={<Session />} />
        <Route
          path="update"
          element={<SessionForm title="Update" mode="update" />}
        />
        <Route path="characters/:characterId">
          <Route index element={<CharacterSheet />} />
          <Route path="update" element={<CharacterUpdateForm />} />
          <Route path="cart" element={<Cart />} />
          <Route path="resume" element={<Resume />} />
          <Route path="resume/update" element={<ResumeForm />} />
          <Route path="notes">
            <Route index element={<Notes />} />
            <Route
              path="create"
              element={<NotesForm title="Create" mode="create" />}
            />
            <Route
              path="update"
              element={<NotesForm title="Update" mode="update" />}
            />
          </Route>
        </Route>
      </Route>
      <Route
        path="create"
        element={<SessionForm title="Create" mode="create" />}
      />
    </Route>
  );
};

export default SessionRoutes;
