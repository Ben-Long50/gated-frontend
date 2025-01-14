import { forwardRef, useEffect, useState } from 'react';

const CloudinaryImage = forwardRef((props, ref) => {
  const [aspectRatio, setAspectRatio] = useState({ width: 1, height: 1 });

  let responsiveUrl;
  let infoUrl;

  if (props.url) {
    const splitUrl = props.url?.split('upload/');

    responsiveUrl = splitUrl[0]
      .concat('upload/w_500,c_scale/')
      .concat(splitUrl[1]);

    infoUrl = splitUrl[0].concat('upload/fl_getinfo/').concat(splitUrl[1]);
  }

  useEffect(() => {
    if (window.cloudinary) {
      const cl = window.cloudinary.Cloudinary.new({
        cloud_name: import.meta.env.VITE_CLOUD_NAME,
      });

      cl.responsive();
    }
  }, []);

  useEffect(() => {
    const getAspecRatio = async () => {
      try {
        const response = await fetch(`${infoUrl}`, {
          headers: { Accept: 'application/json' },
        });

        if (!response.ok) {
          throw new Error(
            `Failed to fetch aspect ratio. Status: ${response.status}`,
          );
        }

        const data = await response.json();

        if (
          !data.input ||
          typeof data.input.width !== 'number' ||
          typeof data.input.height !== 'number'
        ) {
          throw new Error('Unexpected response format from Cloudinary');
        }

        const imageWidth = data.input.width;
        const imageHeight = data.input.height;

        if (imageHeight === 0) {
          throw new Error('Image height is 0, cannot compute aspect ratio');
        }

        setAspectRatio({
          width: imageWidth.toString(),
          height: imageHeight.toString(),
        });
      } catch (error) {
        console.error(`Error getting aspect ratio: ${error.message}`);
        setAspectRatio(1);
      }
    };
    if (infoUrl) {
      getAspecRatio();
    }
  }, [infoUrl]);

  return (
    <div
      className={`${props.className} ${props.detailsOpen ? 'max-w-full sm:w-1/2 sm:max-w-[400px]' : 'max-w-48 sm:max-w-60'} image-container timing my-auto flex aspect-square w-full shrink-0 justify-center overflow-hidden clip-6 sm:min-w-60`}
      style={{
        aspectRatio: aspectRatio.width / aspectRatio.height,
      }}
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

CloudinaryImage.displayName = 'CloudinaryImage';

export default CloudinaryImage;
