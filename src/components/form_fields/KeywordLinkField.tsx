import { FormApi, FormState } from '@tanstack/react-form';
import FormLinkModal from './FormLinkModal';
import { useState } from 'react';
import BtnRect from '../buttons/BtnRect';
import { Keyword } from 'src/types/keyword';
import ItemCardSmall from '../ItemCardSmall';
import Keywords from '../Keywords';
import Icon from '@mdi/react';
import { mdiClose } from '@mdi/js';
import ArrowHeader2 from '../ArrowHeader2';

const KeywordLinkField = ({
  form,
  mode,
  title,
  className,
  keywordType,
}: {
  form: FormApi;
  mode?: string;
  title?: string;
  className?: string;
  keywordType?:
    | 'weapon'
    | 'armor'
    | 'vehicle'
    | 'chromebits'
    | 'hardwired'
    | 'networked';
}) => {
  const [keywordsOpen, setKeywordsOpen] = useState(false);

  const toggleKeywords = () => setKeywordsOpen((prev) => !prev);

  return (
    <div className="flex w-full flex-col gap-4">
      <form.Subscribe selector={(state: FormState) => state.values.keywords}>
        {(keywords: { keyword: Keyword; value?: number }[]) => (
          <>
            {keywords.length > 0 && (
              <ArrowHeader2 title={title ? title : 'Linked Traits'} />
            )}
            <form.Field name="keywords">
              {(field) => (
                <>
                  <FormLinkModal
                    key="keywords"
                    field={field}
                    modalOpen={keywordsOpen}
                    toggleModal={toggleKeywords}
                  >
                    {({ toggleFormLink }) => (
                      <>
                        <Keywords
                          title="Link Traits"
                          forcedMode="form"
                          field={field}
                          toggleFormLink={toggleFormLink}
                          keywordType={keywordType}
                        />
                        <BtnRect
                          type="button"
                          ariaLabel="Close"
                          className="w-full"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            toggleKeywords();
                          }}
                        >
                          Done
                        </BtnRect>
                      </>
                    )}
                  </FormLinkModal>
                  <div
                    className={`${className ? className : 'flex flex-col gap-4'}`}
                  >
                    {keywords.map(
                      (keyword: { keyword: Keyword; value?: number }) => {
                        return (
                          <div
                            className="flex items-center"
                            key={keyword.keyword.id}
                          >
                            <ItemCardSmall
                              key={keyword.keyword.id}
                              heading={
                                <div className="flex w-full items-center justify-between">
                                  <h3>
                                    {keyword.value
                                      ? keyword.keyword?.name.replace(
                                          /X/g,
                                          keyword.value.toString(),
                                        )
                                      : keyword.keyword?.name}
                                  </h3>
                                  {mode === 'modify' && (
                                    <p className="text-tertiary pr-2">
                                      ({keyword.keyword.gpCost} GP)
                                    </p>
                                  )}
                                </div>
                              }
                            >
                              <p>
                                {keyword.value
                                  ? keyword.keyword?.description.replace(
                                      /X/g,
                                      keyword.value.toString(),
                                    )
                                  : keyword.keyword?.description}
                              </p>
                            </ItemCardSmall>
                            <button
                              onClick={() => {
                                field.handleChange(
                                  field.state.value.filter(
                                    (item: {
                                      keyword: Keyword;
                                      value?: number;
                                    }) =>
                                      item.keyword.id !== keyword.keyword.id,
                                  ),
                                );
                              }}
                            >
                              <Icon
                                path={mdiClose}
                                className="text-tertiary hover:text-accent timing size-10"
                              />
                            </button>
                          </div>
                        );
                      },
                    )}
                  </div>
                </>
              )}
            </form.Field>
          </>
        )}
      </form.Subscribe>
      <BtnRect
        className="w-1/3 min-w-48 self-end"
        ariaLabel="Open link trait modal"
        type="button"
        onClick={(e) => {
          e.preventDefault();
          toggleKeywords();
        }}
      >
        Link Traits
      </BtnRect>
    </div>
  );
};

export default KeywordLinkField;
