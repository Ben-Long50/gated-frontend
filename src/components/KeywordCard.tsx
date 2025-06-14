import { ReactNode, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { Keyword, KeywordReference } from 'src/types/keyword';
import ItemCardSmall from './ItemCardSmall';
import InputFieldBasic from './InputFieldBasic';
import { FieldApi } from '@tanstack/react-form';

const KeywordCard = ({
  keyword,
  mode,
  expanded,
  activeKeyword,
  field,
}: {
  keyword: Keyword;
  mode?: string;
  expanded?: boolean;
  activeKeyword?: KeywordReference;
  field?: FieldApi;
}) => {
  const { user } = useContext(AuthContext);

  return (
    <div className="flex items-center gap-4">
      <ItemCardSmall
        expanded={expanded}
        heading={
          <div className="flex w-full shrink items-center justify-between gap-2 pr-2">
            <h3 className="break-words">{keyword.name}</h3>
            <div
              className="pointer-events-auto -my-2 flex items-center gap-4"
              onClick={(e) => e.stopPropagation()}
            >
              {((mode === 'codex' && user?.role === 'ADMIN') ||
                (mode === 'codex' && user?.role === 'SUPERADMIN')) && (
                <Link to={`/glam/codex/keywords/${keyword.id}/update`}>
                  <button className="text-accent hover:underline">Edit</button>
                </Link>
              )}
            </div>
            {activeKeyword && (
              <div
                className="-my-2 shrink-0"
                onClick={(e) => e.stopPropagation()}
              >
                {activeKeyword && (
                  <InputFieldBasic
                    className="max-w-20 shrink-0"
                    name="value"
                    type="number"
                    label="Value"
                    value={activeKeyword.value}
                    onChange={(value: number | string) => {
                      const updatedValue = field.state.value?.map(
                        (item: { keyword: Keyword; value?: number }) =>
                          item.keyword.id === keyword.id
                            ? {
                                keyword: item.keyword,
                                value,
                              }
                            : item,
                      );
                      field.handleChange(updatedValue);
                    }}
                  />
                )}
              </div>
            )}
          </div>
        }
      >
        <p className="text-secondary">{keyword.description}</p>
      </ItemCardSmall>
      {mode === 'form' && (
        <input
          className="size-6 shrink-0"
          type="checkbox"
          checked={!!activeKeyword}
          onChange={() => {
            if (!activeKeyword) {
              field.handleChange([...field.state.value, { keyword }]);
            } else {
              field.handleChange(
                field.state.value?.filter(
                  (item: { keyword: Keyword; value?: number }) =>
                    item.keyword.id !== keyword.id,
                ),
              );
            }
          }}
        />
      )}
    </div>
  );
};

export default KeywordCard;
