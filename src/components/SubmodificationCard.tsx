const SubmodificationCard = ({ modification }) => {
  return (
    <div className="flex h-full grow flex-col items-start justify-between gap-4">
      <h3>{modification.name}</h3>
      <p className="text-tertiary">({modification.modificationType})</p>
      <p>{modification.description}</p>
    </div>
  );
};

export default SubmodificationCard;
