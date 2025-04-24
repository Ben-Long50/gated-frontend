import { Affiliation, Faction } from 'src/types/faction';
import ThemeContainer from './ThemeContainer';
import { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';
import ArrowHeader3 from './ArrowHeader3';
import AffiliationBar from './AffiliationBar';
import { Character } from 'src/types/character';
import AffiliationIcon from './icons/AffiliationIcon';
import { LayoutContext } from '../contexts/LayoutContext';
import { Link } from 'react-router-dom';

const AffiliationCard = ({
  affiliation,
  primaryEntity,
  entityType,
  path,
}: {
  affiliation: Affiliation;
  primaryEntity: Faction | Character;
  entityType: 'faction' | 'character';
  path?: string;
}) => {
  const { accentPrimary } = useContext(ThemeContext);
  const { mobile } = useContext(LayoutContext);

  const otherFaction =
    entityType === 'faction'
      ? affiliation.factions.find(
          (faction: Faction) => faction.id !== primaryEntity.id,
        )
      : null;

  const otherCharacter =
    entityType === 'character'
      ? affiliation.characters.find(
          (character: Character) => character.id !== primaryEntity.id,
        )
      : null;

  return (
    <ThemeContainer
      borderColor={accentPrimary}
      className="w-full"
      chamfer="medium"
      key={affiliation.id}
    >
      <div className="flex w-full flex-col items-start gap-4 p-4">
        <div className="grid w-full grid-cols-[1fr_auto_1fr] items-center gap-8">
          <div className="flex items-center gap-4">
            {!mobile && primaryEntity.picture?.imageUrl && (
              <img
                className="size-16 rounded-full object-cover shadow shadow-black"
                src={primaryEntity.picture?.imageUrl}
                alt={
                  primaryEntity.firstName
                    ? primaryEntity.firstName +
                      ' ' +
                      primaryEntity.lastName +
                      "'s picture"
                    : primaryEntity.name + "'s picture"
                }
              />
            )}
            <ArrowHeader3
              title={
                primaryEntity.firstName
                  ? primaryEntity.firstName + ' ' + primaryEntity.lastName
                  : primaryEntity.name
              }
            />
          </div>
          <AffiliationIcon
            className={`${mobile ? 'size-8' : 'size-12'} text-tertiary place-self-center`}
          />
          {otherFaction && (
            <div className="flex w-full items-center justify-end gap-4">
              <ArrowHeader3
                className="text-right"
                title={otherFaction.name}
                reverse={true}
              />
              {!mobile && otherFaction.picture?.imageUrl && (
                <img
                  className="size-16 rounded-full object-cover shadow shadow-black"
                  src={otherFaction.picture?.imageUrl}
                  alt={otherFaction.name + "'s picture"}
                />
              )}
            </div>
          )}
          {otherCharacter && (
            <div className="flex w-full items-center justify-end gap-4">
              <ArrowHeader3
                className="text-right"
                title={otherCharacter.firstName + ' ' + otherCharacter.lastName}
                reverse={true}
              />
              {!mobile && otherCharacter.picture?.imageUrl && (
                <img
                  className="size-16 rounded-full object-cover shadow shadow-black"
                  src={otherCharacter.picture.imageUrl}
                  alt={
                    otherCharacter.firstName +
                    ' ' +
                    otherCharacter.lastName +
                    "'s picture"
                  }
                />
              )}
            </div>
          )}
        </div>
        <AffiliationBar
          className={`${!mobile && 'px-4'}`}
          value={affiliation.value}
        />
        <Link
          to={
            path
              ? `${path}/${affiliation.id}/update`
              : `${affiliation.id}/update`
          }
        >
          <button className="text-accent hover:underline">
            Update Affiliation
          </button>
        </Link>
      </div>
    </ThemeContainer>
  );
};

export default AffiliationCard;
