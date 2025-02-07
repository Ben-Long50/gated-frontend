const ActionIcon = (props) => {
  return (
    <svg
      className={`${props.className}`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
    >
      <g fill="rgb(229 231 235)">
        <path d="M9.5,9h-3C6.224,9,6,8.776,6,8.5V4H4.5C4.291,4,4.104,3.87,4.031,3.673C3.958,3.477,4.016,3.256,4.175,3.121l3.5-3    c0.188-0.162,0.464-0.16,0.65,0l3.5,3c0.159,0.136,0.217,0.356,0.144,0.553C11.896,3.87,11.709,4,11.5,4H10v4.5    C10,8.776,9.776,9,9.5,9z M7,8h2V3.5C9,3.224,9.224,3,9.5,3h0.648L8,1.159L5.852,3H6.5C6.776,3,7,3.224,7,3.5V8z" />

        <path d="M8,16c-1.654,0-3-1.346-3-3s1.346-3,3-3s3,1.346,3,3S9.654,16,8,16z M8,11c-1.103,0-2,0.897-2,2s0.897,2,2,2   c1.103,0,2-0.897,2-2S9.103,11,8,11z" />
      </g>
    </svg>
  );
};

export default ActionIcon;
