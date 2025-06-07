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
    <div className="absolute top-0 -z-10 mx-auto flex aspect-[10/3] min-h-[500px] max-w-9xl justify-center overflow-hidden rounded-b-xl shadow-lg shadow-black">
      <div className="absolute inset-0 bg-black opacity-60" />
      <img
        className="w-full border-opacity-50 object-cover object-center filter"
        src={`${picture?.imageUrl}`}
        alt="Cover image"
        style={{
          objectPosition: picture?.position
            ? `${picture?.position.x}% ${picture?.position.y}%`
            : '50% 50%',
          //   maskImage: 'linear-gradient(black 0%, transparent 100%',
        }}
      />
      {children}
    </div>
  );
};

export default CoverPicture;
