import { useNavigate, useRouteError } from 'react-router-dom';
import BtnRect from './buttons/BtnRect';
import CloudinaryImage from './CloudinaryImage';

const ErrorPage = () => {
  const error = useRouteError();
  const navigate = useNavigate();
  return (
    <div className="flex h-dvh w-dvw items-center">
      <div className="mx-auto flex max-w-4xl flex-col items-center justify-center gap-10 p-4 sm:gap-16 sm:p-8">
        <div className="flex flex-col gap-4 text-center">
          <h2>Oops looks like you've encountered an error</h2>
          <p>
            Error: <span className="text-error ml-2">{error.message}</span>
          </p>
        </div>
        <CloudinaryImage
          className="aspect-square !w-full max-w-[300px] rounded-full shadow-lg shadow-zinc-950 sm:max-w-[500px]"
          url="https://res.cloudinary.com/dm4tmla72/image/upload/w_auto,c_scale/v1736199635/error_page_image_ugfdxr.jpg"
          alt="Error page image"
        />
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-8">
          <BtnRect className="min-w-40" onClick={() => navigate(-1)}>
            Go back
          </BtnRect>
          <BtnRect
            className="min-w-40"
            onClick={() => navigate('/error/report')}
          >
            Tell Ben
          </BtnRect>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
