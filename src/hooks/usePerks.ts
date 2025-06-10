import { useContext, useMemo, useState } from 'react';
import usePerksQuery from './usePerksQuery/usePerksQuery';
import { AuthContext } from '../contexts/AuthContext';
import { Perk, PerkTree } from '../types/perk';
import { AttributeTree } from '../types/attributeTree';

const usePerks = (attributeTree?: AttributeTree) => {
  const { apiUrl } = useContext(AuthContext);

  const { data: perks, isLoading, isPending } = usePerksQuery(apiUrl);

  const [query, setQuery] = useState('');
  const [attributeQuery, setAttributeQuery] = useState('');
  const [skillQuery, setSkillQuery] = useState('');

  const emptyTree: PerkTree = {
    general: { general: [] },
    cybernetica: {
      chromebits: [],
      hardwired: [],
      motorized: [],
      networked: [],
    },
    esoterica: {
      gestalt: [],
      godhead: [],
      mysticism: [],
      outerworld: [],
    },
    peace: {
      barter: [],
      erudition: [],
      rhetoric: [],
      treatment: [],
    },
    violence: {
      assault: [],
      shooting: [],
      subterfuge: [],
      threshold: [],
    },
  };

  // Sorts the perks from a perk list into attribute and skill arrays corresponding to the perk's requirements
  const sortPerks = (perkList: Perk[]) => {
    const emptyTreeCopy = JSON.parse(JSON.stringify(emptyTree));
    perkList?.forEach((perk: Perk) => {
      const pointsArray = Object.values(perk.attributes).flatMap((attribute) =>
        Object.values(attribute.skills).flatMap((skill) => skill.points),
      );

      const totalPoints = pointsArray.reduce((sum, point) => sum + point, 0);

      if (totalPoints === 0) {
        emptyTreeCopy.general.general.push(perk);
      }
      Object.entries(perk.attributes).forEach(([attribute, skills]) => {
        Object.entries(skills.skills).forEach(([skill, points]) => {
          if (points.points > 0) {
            emptyTreeCopy[attribute][skill].push(perk);
          }
        });
      });
    });
    return emptyTreeCopy;
  };

  //Filters and sorts a perk list while comparing it against a character's attribute tree returning a perk tree containing only perks who's requirements are met by the supplied attribute tree
  const getSatisfiedPerks = (attributeTree: AttributeTree) => {
    return perks?.filter((perk: Perk) => {
      let requirementsMet = true;
      Object.entries(perk.attributes).map(([attribute, { points, skills }]) => {
        if (attributeTree[attribute as keyof AttributeTree].points >= points) {
          Object.entries(skills).map(([skill, { points }]) => {
            if (
              attributeTree[attribute as keyof AttributeTree].skills[skill]
                .points < points
            ) {
              requirementsMet = false;
            }
          });
        } else {
          requirementsMet = false;
        }
      });
      return requirementsMet;
    });
  };

  const perkTree = attributeTree
    ? sortPerks(getSatisfiedPerks(attributeTree) || [])
    : sortPerks(perks || []);

  const filteredPerkTree: PerkTree = useMemo(
    () =>
      sortPerks(
        Object.entries(perkTree)
          .filter(([attribute]) =>
            attribute.toLowerCase().includes(attributeQuery.toLowerCase()),
          )
          .flatMap(([_, skills]) =>
            Object.entries(skills)
              .filter(([skill]) =>
                skill.toLowerCase().includes(skillQuery.toLowerCase()),
              )
              .flatMap(([_, perkList]) =>
                perkList.filter((perk: Perk) =>
                  perk.name.toLowerCase().includes(query.toLowerCase()),
                ),
              ),
          ),
      ),
    [perkTree, attributeQuery, skillQuery, query],
  );

  const filterPerks = (query: string) => {
    setQuery(query);
  };

  const filterByAttribute = (newAttribute: string) => {
    setAttributeQuery(newAttribute);
  };

  const filterBySkill = (newSkill: string) => {
    setSkillQuery(newSkill);
  };

  const resetPerks = () => {
    setAttributeQuery('');
    setQuery('');
  };

  return {
    perks,
    perkTree,
    emptyTree,
    filteredPerkTree,
    filterPerks,
    filterByAttribute,
    filterBySkill,
    resetPerks,
    isLoading,
    isPending,
  };
};

export default usePerks;
