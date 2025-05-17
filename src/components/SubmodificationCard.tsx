import { Item } from 'src/types/item';

const SubmodificationCard = ({ modification }: { modification: Item }) => {
  return (
    <div className="flex h-full grow flex-col items-start justify-between gap-4">
      <h3>{modification.name}</h3>
      <p>{modification.description}</p>
    </div>
  );
};

export default SubmodificationCard;
