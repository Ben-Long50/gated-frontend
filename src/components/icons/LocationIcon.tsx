const LocationIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      className={`${className ? className : 'text-secondary'} timing`}
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      viewBox="0 0 95 95"
    >
      <g strokeWidth="1">
        <path
          d="M47.5,1A34.459,34.459,0,0,0,13.041,35.459C13.041,54.49,31.736,75.08,47.5,94,63.264,75.08,81.959,54.49,81.959,35.459A34.459,34.459,0,0,0,47.5,1Zm0,50.879a16.42,16.42,0,1,1,16.42-16.42A16.451,16.451,0,0,1,47.5,51.879Z"
          fillRule="evenodd"
        />
      </g>
    </svg>
  );
};

export default LocationIcon;
