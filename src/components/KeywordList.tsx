import { Item } from 'src/types/item';
import { Keyword } from 'src/types/keyword';
import ItemCardSmall from './ItemCardSmall';
import Icon from '@mdi/react';
import { mdiCollapseAllOutline, mdiExpandAllOutline } from '@mdi/js';
import { useState } from 'react';
import ArrowHeader2 from './ArrowHeader2';

const KeywordList = ({
  item,
  title,
  className,
}: {
  item: Item;
  title: string;
  className?: string;
}) => {
  const [traitsExpanded, setTraitsExpanded] = useState(false);

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex w-full items-center justify-between gap-8">
        <ArrowHeader2 title={title} />
        <button
          aria-label="Expand all traits"
          className="bg-tertiary group ml-auto size-10 rounded p-2 shadow-md shadow-black"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setTraitsExpanded((prev) => !prev);
          }}
        >
          {traitsExpanded ? (
            <Icon
              path={mdiCollapseAllOutline}
              className="text-secondary timing group-hover:text-yellow-300"
            />
          ) : (
            <Icon
              path={mdiExpandAllOutline}
              className="text-secondary timing group-hover:text-yellow-300"
            />
          )}
        </button>
      </div>

      {item?.keywords && item.keywords.length > 0 && (
        <div className={`${className}`}>
          {item.keywords?.map(
            (item: { keyword: Keyword; value: number | null }) => {
              return (
                <ItemCardSmall
                  key={item.keyword.id}
                  expanded={traitsExpanded}
                  heading={
                    <h4>
                      {item.value
                        ? item.keyword?.name.replace(
                            /X/g,
                            item.value.toString(),
                          )
                        : item.keyword?.name}
                    </h4>
                  }
                >
                  <p>
                    {item.value
                      ? item.keyword?.description.replace(
                          /X/g,
                          item.value.toString(),
                        )
                      : item.keyword?.description}
                  </p>
                </ItemCardSmall>
              );
            },
          )}
        </div>
      )}
    </div>
  );
};

export default KeywordList;
