import { useEffect } from 'react';

type Position = {
  x: number;
  y: number;
};

const CloudinaryImage = ({
  className,
  url,
  position,
  alt,
  onClick,
  style,
}: {
  className?: string;
  url: string;
  position: Position;
  alt: string;
  onClick?: () => void;
  style: object;
}) => {
  let responsiveUrl;

  if (url) {
    const splitUrl = url?.split('upload/');

    responsiveUrl = splitUrl[0]
      .concat('upload/w_auto,c_scale/')
      .concat(splitUrl[1]);
  }

  useEffect(() => {
    if (window.cloudinary) {
      const cl = window.cloudinary.Cloudinary.new({
        cloud_name: import.meta.env.VITE_CLOUD_NAME,
      });

      cl.responsive();
    }
  }, []);

  return (
    <img
      className={`${className} cld-responsive bg-primary h-full w-full object-cover`}
      style={{
        objectPosition: position ? `${position.x}% ${position.y}%` : '50% 50%',
        ...style,
      }}
      data-src={responsiveUrl}
      loading="lazy"
      alt={alt}
      onClick={onClick}
    />
  );
};

CloudinaryImage.displayName = 'CloudinaryImage';

export default CloudinaryImage;
