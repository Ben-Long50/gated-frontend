import useCampaignQuery from 'src/hooks/useCampaignQuery/useCampaignQuery';
import Affiliations from './Affiliations';
import { useContext } from 'react';
import { AuthContext } from 'src/contexts/AuthContext';
import { useParams } from 'react-router-dom';
import Loading from './Loading';
import ThemeContainer from './ThemeContainer';
import { ThemeContext } from 'src/contexts/ThemeContext';
import { useForm, useStore } from '@tanstack/react-form';
import InputSelectField from './InputSelectField';
import useAffiliationQueries from 'src/hooks/useAffiliationQueries/useAffiliationQueries';
import Icon from '@mdi/react';
import { mdiSync } from '@mdi/js';
import { Faction } from 'src/types/faction';
import { Character } from 'src/types/character';
import ArrowHeader3 from './ArrowHeader3';

const CampaignAffiliations = () => {
  const { apiUrl } = useContext(AuthContext);
  const { accentPrimary } = useContext(ThemeContext);
  const { campaignId } = useParams();

  const { data: campaign, isLoading: campaignLoading } = useCampaignQuery(
    apiUrl,
    Number(campaignId),
  );

  const { data: affiliations, isLoading: affiliationsLoading } =
    useAffiliationQueries(
      campaign?.affiliations.map((affiliation) => affiliation.id) || [],
    );

  const searchForm = useForm({
    defaultValues: {
      entity: '',
    },
    onSubmit: () => {
      searchForm.reset();
    },
  });

  const entity = useStore(searchForm.store, (state) => state.values.entity);

  const filteredAffiliations = entity
    ? affiliations?.filter(
        (affiliation) =>
          affiliation?.factions?.some(
            (faction: Faction) => faction.id === entity.id,
          ) ||
          affiliation?.characters?.some(
            (character: Character) => character.id === entity.id,
          ),
      )
    : affiliations;

  const isLoading = campaignLoading || affiliationsLoading;

  if (isLoading) return <Loading />;

  return (
    <div className="flex w-full max-w-7xl flex-col items-center gap-8">
      <h1 className="text-center">Affiliations</h1>
      <ThemeContainer
        className={`ml-auto w-full`}
        chamfer="medium"
        borderColor={accentPrimary}
      >
        <form className="flex w-full flex-col gap-4 p-4">
          <div className="grid w-full items-center gap-4 max-sm:grid-flow-row sm:grid-flow-col sm:gap-8">
            <ArrowHeader3 title="Affiliation Options" />
          </div>

          <div className="flex w-full items-center gap-4">
            <searchForm.Field name="entity">
              {(field) => (
                <InputSelectField
                  field={field}
                  label="Select Entity"
                  options={[
                    ...(campaign?.factions.sort((a, b) =>
                      a.name.localeCompare(b.name),
                    ) || []),
                    ...(campaign?.characters.sort((a, b) =>
                      a.firstName.localeCompare(b.firstName),
                    ) || []),
                  ]}
                />
              )}
            </searchForm.Field>
            <button
              className="text-accent bg-tertiary shadow-color group z-10 grid size-12 shrink-0 place-items-center rounded-md p-1.5 shadow-md hover:underline"
              onClick={(e) => {
                e.preventDefault();
                searchForm.reset();
              }}
            >
              <Icon
                path={mdiSync}
                className="text-secondary group-hover:text-accent timing"
              />
            </button>
          </div>
        </form>
      </ThemeContainer>
      <searchForm.Subscribe selector={(state) => state.values.entity}>
        {(entity) => (
          <Affiliations affiliations={filteredAffiliations} entity={entity} />
        )}
      </searchForm.Subscribe>
    </div>
  );
};

export default CampaignAffiliations;
