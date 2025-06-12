import { FormApi, FormState } from '@tanstack/react-form';
import FormLinkModal from '../modals/ItemLinkModal';
import { useState } from 'react';
import BtnRect from '../buttons/BtnRect';
import { Keyword } from 'src/types/keyword';
import ItemCardSmall from '../ItemCardSmall';
import Keywords from '../Keywords';
import Icon from '@mdi/react';
import { mdiClose } from '@mdi/js';
import ArrowHeader2 from '../ArrowHeader2';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import useModalStore from 'src/stores/modalStore';

const KeywordLinkField = ({
  form,
  mode,
  title,
}: {
  form: FormApi;
  mode?: string;
  title?: string;
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const parts = location.pathname.split('/');

  const setBackgroundPath = useModalStore((state) => state.setBackgroundPath);

  const openKeywordLinkModal = () => {
    setBackgroundPath(location.pathname);
    navigate('traits');
  };

  return (
    <>
      <form.Subscribe selector={(state: FormState) => state.values.keywords}>
        {(keywords: { keyword: Keyword; value?: number }[]) => (
          <>
            {keywords.length > 0 && (
              <ArrowHeader2 title={title ? title : 'Linked Traits'} />
            )}
            <form.Field name="keywords">
              {(field) => (
                <>
                  {parts[parts.length - 1] === 'traits' && (
                    <Outlet context={{ field }} />
                  )}
                  {keywords.length > 0 && (
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
                                    <h4>
                                      {keyword.value
                                        ? keyword.keyword?.name.replace(
                                            /X/g,
                                            keyword.value.toString(),
                                          )
                                        : keyword.keyword?.name}
                                    </h4>
                                    {mode === 'upgrade' && (
                                      <p className="text-tertiary ml-auto pr-2">
                                        ({keyword.keyword.gpCost} GP)
                                      </p>
                                    )}
                                    <button
                                      onClick={() => {
                                        field.handleChange(
                                          field.state.value.filter(
                                            (item: {
                                              keyword: Keyword;
                                              value?: number;
                                            }) =>
                                              item.keyword.id !==
                                              keyword.keyword.id,
                                          ),
                                        );
                                      }}
                                    >
                                      <Icon
                                        path={mdiClose}
                                        className="text-tertiary hover:text-accent timing -m-2 mr-1 size-9"
                                      />
                                    </button>
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
                            </div>
                          );
                        },
                      )}
                    </div>
                  )}
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
          openKeywordLinkModal();
        }}
      >
        Link Traits
      </BtnRect>
    </>
  );
};

export default KeywordLinkField;
