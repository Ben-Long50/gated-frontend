import { useEffect } from 'react';
import { motion } from 'motion/react';

const CloudinaryImage = ({
  className,
  url,
  width,
  height,
  alt,
  onClick,
}: {
  className: string;
  url: string;
  width?: number;
  height?: number;
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
    <img
      className={`${className} cld-responsive`}
      width={width}
      height={height}
      data-src={responsiveUrl}
      loading="lazy"
      alt={alt}
      onClick={onClick}
    />
  );
};

CloudinaryImage.displayName = 'CloudinaryImage';

export default CloudinaryImage;
