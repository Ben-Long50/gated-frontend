import { forwardRef, useEffect } from 'react';

const CloudinaryImageSmall = forwardRef((props, ref) => {
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
    <div
      className={`${props.className} image-container timing my-auto flex aspect-square shrink-0 justify-center overflow-hidden clip-4`}
    >
      <img
        ref={ref}
        className="cld-responsive text-secondary object-cover text-xl"
        width={props.width}
        height={props.height}
        data-src={responsiveUrl}
        loading="lazy"
        alt={props.alt}
        onClick={props.onClick}
      />
    </div>
  );
});

CloudinaryImageSmall.displayName = 'CloudinaryImageSmall';

export default CloudinaryImageSmall;
