import { ReactNode } from 'react';
import { Picture } from 'src/types/picture';

const CoverPicture = ({
  picture,
  children,
}: {
  picture: Picture;
  children?: ReactNode;
}) => {
  return (
    <div className="shadow-color absolute top-0 -z-10 mx-auto flex h-[400px] w-full max-w-9xl justify-center overflow-hidden shadow-lg sm:h-[500px] xl:rounded-b-xl">
      <div className="absolute inset-0 w-full bg-white opacity-60 dark:bg-black" />
      <img
        className="w-full border-opacity-50 object-cover object-center filter"
        src={`${picture?.imageUrl}`}
        alt="Cover image"
        style={{
          objectPosition: picture?.position
            ? `${picture?.position.x}% ${picture?.position.y}%`
            : '50% 50%',
        }}
      />
      {children}
    </div>
  );
};

export default CoverPicture;
