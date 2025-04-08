import { User } from 'src/types/user';
import CharacterIcon from './icons/CharacterIcon';

const AccountPicture = ({
  user,
  className,
}: {
  user: User | null;
  className?: string;
}) => {
  return user ? (
    user?.profilePicture ? (
      <img
        key={user.id}
        className={`${className} size-10 shrink-0 rounded-full`}
        src={user.profilePicture}
        alt="Profile"
      />
    ) : (
      <div
        className={`${className} flex size-10 shrink-0 items-center justify-center rounded-full bg-yellow-300`}
      >
        <p className="pt-1 text-2xl font-semibold !text-zinc-900">
          {user.firstName[0].toUpperCase()}
        </p>
      </div>
    )
  ) : (
    <CharacterIcon className="size-10" />
  );
};

export default AccountPicture;
