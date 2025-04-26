const ReactionIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      className={`${className ? className : 'text-secondary'} timing`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
    >
      <g strokeWidth="1">
        <path d="M25.5,32L15,22.8V27H1v10h14v4.2L25.5,32z M3,35v-6h14v-1.8l5.5,4.8L17,36.8V35H3z" />
        <path d="M41.2,15H37V1H27v14h-4.2L32,25.5L41.2,15z M29,17V3h6v14h1.8L32,22.5L27.2,17H29z" />
        <path d="M22.8,49H27v14h10V49h4.2L32,38.5L22.8,49z M35,47v14h-6V47h-1.8l4.8-5.5l4.8,5.5H35z" />
        <path d="M49,27v-4.2L38.5,32L49,41.2V37h14V27H49z M61,35H47v1.8L41.5,32l5.5-4.8V29h14V35z" />
        <path d="M27,32c0,2.8,2.2,5,5,5s5-2.2,5-5s-2.2-5-5-5S27,29.2,27,32z M35,32c0,1.7-1.3,3-3,3s-3-1.3-3-3s1.3-3,3-3S35,30.3,35,32z" />
      </g>
    </svg>
  );
};

export default ReactionIcon;
