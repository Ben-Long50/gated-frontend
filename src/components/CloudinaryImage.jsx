import { forwardRef, useEffect } from 'react';
import { motion } from 'motion/react';

const CloudinaryImage = forwardRef((props, ref) => {
  let responsiveUrl;

  if (props.url) {
    const splitUrl = props.url?.split('upload/');

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
    <motion.img
      ref={ref}
      className={`${props.className} cld-responsive text-secondary aspect-square w-full text-xl clip-6`}
      width={props.width}
      height={props.height}
      data-src={responsiveUrl}
      loading="lazy"
      alt={props.alt}
      onClick={props.onClick}
    />
  );
});

CloudinaryImage.displayName = 'CloudinaryImage';

export default CloudinaryImage;
