import { forwardRef, useContext, useEffect } from 'react';
import { motion } from 'motion/react';
import { LayoutContext } from '../contexts/LayoutContext';

const CloudinaryImage = forwardRef((props, ref) => {
  const { layoutSize } = useContext(LayoutContext);

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
    <motion.div
      className={`${props.className} mb-auto aspect-square overflow-hidden lg:shrink-0`}
      initial={{ width: 280 }}
      animate={
        layoutSize !== 'small' && layoutSize !== 'xsmall'
          ? {
              width: props.detailsOpen ? 'clamp(280px, 50%, 400px)' : 280,
            }
          : { width: props.detailsOpen ? '100%' : 'clamp(200px, 50%, 300px)' }
      }
      transition={{ duration: 0.2 }}
    >
      <motion.img
        ref={ref}
        className="cld-responsive text-secondary w-full object-cover text-xl clip-6"
        width={props.width}
        height={props.height}
        data-src={responsiveUrl}
        loading="lazy"
        alt={props.alt}
        onClick={props.onClick}
      />
    </motion.div>
  );
});

CloudinaryImage.displayName = 'CloudinaryImage';

export default CloudinaryImage;
