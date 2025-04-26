const ActionIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      className={`${className ? className : 'text-secondary'} timing`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
    >
      <g strokeWidth="1">
        <path d="M63.5,32L53,22.8V27H39v10h14v4.2L63.5,32z M41,35v-6h14v-1.8l5.5,4.8L55,36.8V35H41z" />
        <path d="M25,27H11v-4.2L0.5,32L11,41.2V37h14V27z M23,35H9v1.8L3.5,32L9,27.2V29h14V35z" />
        <path d="M37,39H27v14h-4.2L32,63.5L41.2,53H37V39z M32,60.5L27.2,55H29V41h6v14h1.8L32,60.5z" />
        <path d="M27,25h10V11h4.2L32,0.5L22.8,11H27V25z M32,3.5L36.8,9H35v14h-6V9h-1.8L32,3.5z" />
        <path d="M32,27c-2.8,0-5,2.2-5,5s2.2,5,5,5s5-2.2,5-5S34.8,27,32,27z M32,35c-1.7,0-3-1.3-3-3s1.3-3,3-3s3,1.3,3,3S33.7,35,32,35z" />
      </g>
    </svg>
  );
};

export default ActionIcon;
