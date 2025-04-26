const HealthIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      className={`${className ? className : 'text-secondary'} timing`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
    >
      <g strokeWidth="1">
        <path d="M24.06,45a21,21,0,1,0-21-21A21,21,0,0,0,24.06,45Zm0-40a19,19,0,1,1-19,19A19,19,0,0,1,24.06,5Z" />
        <path d="M19.06,38a1,1,0,0,0,1,1h8a1,1,0,0,0,1-1V29h9a1,1,0,0,0,1-1V20a1,1,0,0,0-1-1h-9V10a1,1,0,0,0-1-1h-8a1,1,0,0,0-1,1v9h-9a1,1,0,0,0-1,1v8a1,1,0,0,0,1,1h9Zm-8-11V21h9a1,1,0,0,0,1-1V11h6v9a1,1,0,0,0,1,1h9v6h-9a1,1,0,0,0-1,1v9h-6V28a1,1,0,0,0-1-1Z" />
      </g>
    </svg>
  );
};

export default HealthIcon;
