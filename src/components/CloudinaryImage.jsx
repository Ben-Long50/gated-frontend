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
      className={`${props.className} image-container mb-auto aspect-square w-full overflow-hidden sm:min-w-60`}
      animate={
        layoutSize === 'small' || layoutSize === 'xsmall'
          ? {
              maxWidth: props.detailsOpen ? 350 : 200,
            }
          : {
              maxWidth: props.detailsOpen ? 400 : 280,
            }
      }
      transition={{ duration: 0.2 }}
    >
      <img
        ref={ref}
        className="cld-responsive text-secondary object-cover text-xl clip-6"
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
