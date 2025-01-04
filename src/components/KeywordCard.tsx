import { mdiChevronDown } from '@mdi/js';
import Icon from '@mdi/react';
import { useState } from 'react';
import Tag from './Tag';
import { Link } from 'react-router-dom';

const KeywordCard = ({ keyword }, props) => {
  const [detailsOpen, setDetailsOpen] = useState(false);

  return (
    <div
      className={`${props.className} ${detailsOpen && 'col-span-2'} bg-secondary mb-auto w-full p-4 clip-4`}
      onClick={async (e) => {
        e.preventDefault();
        setDetailsOpen(!detailsOpen);
      }}
    >
      <summary
        className={`text-primary flex w-full items-center justify-between`}
      >
        <div className="flex w-full items-center justify-between gap-4 pr-2">
          <h3> {keyword.name}</h3>
          <Link to={`${keyword.id}/update`}>
            <button className="text-accent hover:underline">Edit</button>
          </Link>
        </div>
        <span className={`timing shrink-0 ${detailsOpen && '-rotate-180'}`}>
          <Icon
            path={mdiChevronDown}
            size={1.1}
            className={`text-secondary`}
          ></Icon>
        </span>
      </summary>
      <div
        className={`${!detailsOpen ? 'hidden' : 'flex'} mt-4 flex-col gap-4`}
      >
        <Tag label={keyword.keywordType} />
        <p className="text-secondary">{keyword.description}</p>
      </div>
    </div>
  );
};

export default KeywordCard;
