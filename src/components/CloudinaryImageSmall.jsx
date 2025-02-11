import { forwardRef, useContext, useEffect } from 'react';
import { motion } from 'motion/react';
import { LayoutContext } from '../contexts/LayoutContext';

const CloudinaryImageSmall = forwardRef((props, ref) => {
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
      className={`${props.className} mb-auto aspect-square w-full shrink-0 overflow-hidden`}
      initial={{ width: 100 }}
      animate={
        layoutSize !== 'small' && layoutSize !== 'xsmall'
          ? {
              width: props.detailsOpen ? 200 : 100,
            }
          : {}
      }
      transition={{ duration: 0.2 }}
    >
      <motion.img
        transition={{ duration: 0.2 }}
        ref={ref}
        className="cld-responsive text-secondary w-full object-cover text-xl"
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

CloudinaryImageSmall.displayName = 'CloudinaryImageSmall';

export default CloudinaryImageSmall;
