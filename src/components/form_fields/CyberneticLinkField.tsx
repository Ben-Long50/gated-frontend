import { FormApi, FormState } from '@tanstack/react-form';
import FormLinkModal from './FormLinkModal';
import { useState } from 'react';
import BtnRect from '../buttons/BtnRect';
import { Cybernetic, CyberneticWithKeywords } from 'src/types/cybernetic';
import Cybernetics from '../Cybernetics';
import CyberneticCard from '../CyberneticCard';
import ArrowHeader2 from '../ArrowHeader2';

const CyberneticLinkField = ({ form }: { form: FormApi }) => {
  const [cyberneticsOpen, setCyberneticsOpen] = useState(false);

  const toggleCybernetics = () => setCyberneticsOpen((prev) => !prev);

  return (
    <>
      <form.Subscribe selector={(state: FormState) => state.values.cybernetics}>
        {(cybernetics: CyberneticWithKeywords[]) => (
          <>
            {cybernetics.length > 0 && (
              <ArrowHeader2 title="Linked Cybernetics" />
            )}
            <form.Field name="cybernetics">
              {(field) => (
                <>
                  <FormLinkModal
                    key="cybernetics"
                    field={field}
                    modalOpen={cyberneticsOpen}
                    toggleModal={toggleCybernetics}
                  >
                    {({ toggleFormLink }) => (
                      <Cybernetics
                        title="Link Cybernetics"
                        mode="form"
                        toggleFormLink={toggleFormLink}
                      />
                    )}
                  </FormLinkModal>
                  {cybernetics.map((cybernetic: CyberneticWithKeywords) => {
                    return (
                      <button
                        key={cybernetic.id}
                        onClick={() => {
                          field.handleChange(
                            field.state.value.filter(
                              (item: Cybernetic) => item.id !== cybernetic.id,
                            ),
                          );
                        }}
                      >
                        <CyberneticCard cybernetic={cybernetic} mode="form" />
                      </button>
                    );
                  })}
                </>
              )}
            </form.Field>
          </>
        )}
      </form.Subscribe>
      <BtnRect
        className="w-1/3 min-w-48 self-end"
        ariaLabel="Open link cybernetic modal"
        type="button"
        onClick={(e) => {
          e.preventDefault();
          toggleCybernetics();
        }}
      >
        Link Cybernetics
      </BtnRect>
    </>
  );
};

export default CyberneticLinkField;
