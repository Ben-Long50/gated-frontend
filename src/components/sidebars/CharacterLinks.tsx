import CharacterIcon from '../icons/CharacterIcon';
import LinkListSidebar from './LinkListSidebar';
import LinkSidebar from './LinkSidebar';

const CharacterLinks = ({ setSidebarVisibility }) => {
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
