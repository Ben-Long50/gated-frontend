import { User } from 'src/types/user';
import CharacterIcon from './icons/CharacterIcon';
import { useContext } from 'react';
import { ThemeContext } from 'src/contexts/ThemeContext';

const AccountPicture = ({
  user,
  className,
}: {
  user: User | null;
  className?: string;
}) => {
  const { accentPrimary } = useContext(ThemeContext);
  return user ? (
    user?.profilePicture ? (
      <img
        key={user.id}
        className={`${className} shadow-color size-10 shrink-0 rounded-full shadow-md`}
        src={user.profilePicture}
        alt="Profile"
      />
    ) : (
      <div
        className={`${className} shadow-color flex size-10 shrink-0 items-center justify-center rounded-full shadow-md`}
        style={{ backgroundColor: accentPrimary }}
      >
        <p className="pt-1 text-2xl font-semibold !text-zinc-900">
          {user.username[0].toUpperCase()}
        </p>
      </div>
    )
  ) : (
    <CharacterIcon className="text-secondary shadow-color size-10 shadow-md" />
  );
};

export default AccountPicture;
