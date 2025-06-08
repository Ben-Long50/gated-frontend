import { Affiliation } from 'src/types/faction';
import ThemeContainer from './ThemeContainer';
import { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';
import AffiliationBar from './AffiliationBar';
import AffiliationIcon from './icons/AffiliationIcon';
import { LayoutContext } from '../contexts/LayoutContext';
import CharacterPictureRound from './CharacterPictureRound';
import ArrowHeader4 from './ArrowHeader4';
import useAffiliationValueMutation from 'src/hooks/useAffiliationValueMutation/useAffiliationValueMutation';
import { AuthContext } from 'src/contexts/AuthContext';

const AffiliationCard = ({ affiliation }: { affiliation: Affiliation }) => {
  const { apiUrl, user } = useContext(AuthContext);
  const { accentPrimary } = useContext(ThemeContext);
  const { mobile } = useContext(LayoutContext);

  const editAffiliationValue = useAffiliationValueMutation(
    apiUrl,
    affiliation.id,
  );

  const entities = [...affiliation.factions, ...affiliation.characters];

  return (
    <ThemeContainer
      borderColor={accentPrimary}
      className="w-full"
      chamfer="medium"
      key={affiliation.id}
    >
      <div className="flex w-full flex-col items-start gap-4 p-4">
        <div className="grid w-full grid-cols-[1fr_auto_1fr] gap-8">
          {entities.map((entity, index) => {
            const entityName = entity.firstName
              ? entity.firstName + ' ' + entity.lastName
              : entity.name;

            return (
              <>
                <div
                  className={`${index === 0 ? 'mr-auto justify-start' : 'ml-auto justify-end'} flex w-3/4 items-center gap-4`}
                >
                  {index === 0 && <CharacterPictureRound character={entity} />}
                  {!mobile && (
                    <ArrowHeader4
                      className={`${index === 0 ? 'text-left' : 'text-right'} text-primary`}
                      title={entityName}
                      reverse={index === 0 ? false : true}
                    />
                  )}
                  {index > 0 && <CharacterPictureRound character={entity} />}
                </div>
                {index === 0 && (
                  <AffiliationIcon
                    className={`${mobile ? 'size-10' : 'size-12'} text-tertiary place-self-center`}
                  />
                )}
              </>
            );
          })}
        </div>
        <AffiliationBar
          className={`${!mobile && 'px-4'}`}
          value={affiliation.value}
          onClick={
            user.id === affiliation.campaign.ownerId ||
            affiliation.characters.some(
              (character) => character.userId === user.id,
            )
              ? (value: number) => editAffiliationValue.mutate(value)
              : undefined
          }
        />
      </div>
    </ThemeContainer>
  );
};

export default AffiliationCard;
