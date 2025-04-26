import { useEffect } from 'react';

const CloudinaryImageSmall = ({
  className,
  url,
  alt,
  onClick,
}: {
  className?: string;
  url: string;
  alt: string;
  onClick?: () => void;
}) => {
  let responsiveUrl;

  if (url) {
    const splitUrl = url?.split('upload/');

    responsiveUrl = splitUrl[0]
      .concat('upload/w_500,c_scale/')
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
    <div
      className={`${className} mb-auto aspect-square w-full shrink-0 overflow-hidden`}
    >
      <img
        className="cld-responsive text-secondary w-full object-cover text-xl"
        data-src={responsiveUrl}
        loading="lazy"
        alt={alt}
        onClick={onClick}
      />
    </div>
  );
};

CloudinaryImageSmall.displayName = 'CloudinaryImageSmall';

export default CloudinaryImageSmall;
