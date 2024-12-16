const ThemeBorder = (props) => {
  // const scaleDim = Math.floor(
  //   props.height * 0.02 > 6 ? props.height * 0.02 - 4 : 1,
  // );
  const scaleDim = 1;
  const points = `
            ${props.chamfer - scaleDim - 1}, 0 
            ${props.width}, 0
            ${props.width},${props.height - props.chamfer + scaleDim + 1} 
            ${props.width - props.chamfer + scaleDim + 1},${props.height} 
            0,${props.height} 
            0,${props.chamfer - scaleDim - 1}
        `;

  return (
    <svg
      className={`${props.className}`}
      width={`${props.width + scaleDim}`}
      height={`${props.height + scaleDim}`}
      viewBox={`0 0 ${props.width} ${props.height}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <polygon
        className="timing opacity-60"
        points={points}
        fill={`${props.borderColor}`}
        stroke={`${props.borderColor}`}
      />
    </svg>
  );
};

export default ThemeBorder;
