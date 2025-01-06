import { useContext, useState } from 'react';
import { AttributeTree } from './useAttributeTree';
import usePerksQuery from './usePerksQuery/usePerksQuery';
import { AuthContext } from '../contexts/AuthContext';

interface Perk {
  name: string;
  description: string;
  requirements: Partial<AttributeTree>;
}

interface GeneralPerks {
  general: Perk[];
}

interface CyberneticaPerks {
  chromebits: Perk[];
  hardwired: Perk[];
  motorized: Perk[];
  networked: Perk[];
}

interface EsotericaPerks {
  gestalt: Perk[];
  godhead: Perk[];
  mysticism: Perk[];
  outerworld: Perk[];
}

interface PeacePerks {
  barter: Perk[];
  erudition: Perk[];
  rhetoric: Perk[];
  treatment: Perk[];
}

interface ViolencePerks {
  assault: Perk[];
  shooting: Perk[];
  subterfuge: Perk[];
  threshold: Perk[];
}

export interface PerkTree {
  general: GeneralPerks;
  cybernetica: CyberneticaPerks;
  esoterica: EsotericaPerks;
  peace: PeacePerks;
  violence: ViolencePerks;
}

const usePerks = (attributeTree?: AttributeTree) => {
  const { apiUrl, authToken } = useContext(AuthContext);

  const {
    data: perks,
    isLoading,
    isPending,
  } = usePerksQuery(apiUrl, authToken);

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
    perkList?.map((perk: Perk) => {
      if (!perk.requirements || !Object.keys(perk.requirements).length) {
        emptyTreeCopy.general.general.push(perk);
      } else {
        Object.entries(perk.requirements).map(([attribute, { skills }]) => {
          Object.entries(skills).map(([skill]) => {
            if (attribute === 'cybernetica') {
              emptyTreeCopy.cybernetica[skill as keyof CyberneticaPerks].push(
                perk,
              );
            } else if (attribute === 'esoterica') {
              emptyTreeCopy.esoterica[skill as keyof EsotericaPerks].push(perk);
            } else if (attribute === 'peace') {
              emptyTreeCopy.peace[skill as keyof PeacePerks].push(perk);
            } else if (attribute === 'violence') {
              emptyTreeCopy.violence[skill as keyof ViolencePerks].push(perk);
            }
          });
        });
      }
    });
    return emptyTreeCopy;
  };

  //Filters and sorts a perk list while comparing it against a character's attribute tree returning a perk tree containing only perks who's requirements are met by the supplied attribute tree
  const getSatisfiedPerks = (attributeTree: AttributeTree) => {
    const satisfiedPerks = perks?.map((perk: Perk) => {
      let requirementsMet = true;
      Object.entries(perk.requirements).map(
        ([attribute, { points, skills }]) => {
          if (
            attributeTree[attribute as keyof AttributeTree].points >= points
          ) {
            return Object.entries(skills).map(([skill, { points }]) => {
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
        },
      );
      return requirementsMet ? perk : false;
    });
    const satisfiedPerkTree = sortPerks(
      satisfiedPerks?.filter((perk: Perk) => !!perk),
    );
    return satisfiedPerkTree;
  };

  const perkTree: PerkTree = attributeTree
    ? getSatisfiedPerks(attributeTree)
    : sortPerks(perks || []);

  const filteredPerkTree = sortPerks(
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
