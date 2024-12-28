import { mdiChevronDown } from '@mdi/js';
import Icon from '@mdi/react';
import { useState } from 'react';
import Tag from './Tag';

const KeywordCard = (props) => {
  const [detailsOpen, setDetailsOpen] = useState(false);

  return (
    <div
      className={`${props.className} bg-secondary timing group mb-auto p-4 clip-4 [&_summary::-webkit-details-marker]:hidden`}
      onClick={async (e) => {
        e.preventDefault();
        setDetailsOpen(!detailsOpen);
      }}
    >
      <summary
        className={`text-primary timing flex items-center justify-between text-xl font-semibold tracking-widest`}
      >
        <span className="pl-2"> {props.keyword.name}</span>
        <span className={`timing shrink-0 ${detailsOpen && '-rotate-180'}`}>
          <Icon
            path={mdiChevronDown}
            size={1.1}
            className={`text-secondary`}
          ></Icon>
        </span>
      </summary>
      <div
        className={`timing ease-in-out ${!detailsOpen ? 'hidden' : 'flex'} scrollbar-secondary flex flex-col gap-2 overflow-y-auto`}
      >
        <div className="mt-2"></div>
        <Tag label={props.keyword.keywordType} />
        <strong className="text-primary mt-2 text-lg tracking-wide">
          Description:
        </strong>
        <p className="text-secondary">{props.keyword.description}</p>
      </div>
    </div>
  );
};

export default KeywordCard;
