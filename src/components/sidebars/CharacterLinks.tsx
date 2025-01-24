import CharacterIcon from '../icons/CharacterIcon';
import LinkListSidebar from './LinkListSidebar';
import LinkSidebar from './LinkSidebar';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import Loading from '../Loading';
import useActiveCharacterQuery from '../../hooks/useActiveCharacterQuery/useActiveCharacterQuery';

const CharacterLinks = ({ setSidebarVisibility }) => {
  const { apiUrl } = useContext(AuthContext);

  const {
    data: character,
    isPending,
    isLoading,
  } = useActiveCharacterQuery(apiUrl);

  if (isLoading || isPending) return <Loading />;

  return (
    <>
      <LinkListSidebar
        title={
          <>
            <CharacterIcon className="size-8" />
            <p className="text-inherit">Characters</p>
          </>
        }
      >
        <LinkSidebar
          title="Character list"
          path="characters"
          setSidebarVisibility={setSidebarVisibility}
        />
        <LinkSidebar
          title="Create new character"
          path="characters/create"
          setSidebarVisibility={setSidebarVisibility}
        />
      </LinkListSidebar>
    </>
  );
};

export default CharacterLinks;
