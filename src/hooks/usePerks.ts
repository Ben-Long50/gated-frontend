import { useContext, useEffect, useState } from 'react';
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
  generalPerks: GeneralPerks;
  cyberneticaPerks: CyberneticaPerks;
  esotericaPerks: EsotericaPerks;
  peacePerks: PeacePerks;
  violencePerks: ViolencePerks;
}

const usePerks = () => {
  const { apiUrl, authToken } = useContext(AuthContext);

  const {
    data: perks,
    isLoading,
    isPending,
  } = usePerksQuery(apiUrl, authToken);

  const initialTree: PerkTree = {
    generalPerks: { general: [] },
    cyberneticaPerks: {
      chromebits: [],
      hardwired: [],
      motorized: [],
      networked: [],
    },
    esotericaPerks: {
      gestalt: [],
      godhead: [],
      mysticism: [],
      outerworld: [],
    },
    peacePerks: {
      barter: [],
      erudition: [],
      rhetoric: [],
      treatment: [],
    },
    violencePerks: {
      assault: [],
      shooting: [],
      subterfuge: [],
      threshold: [],
    },
  };

  const [perkTree, setPerkTree] = useState(initialTree);
  const [filteredTree, setFilteredTree] = useState(initialTree);

  useEffect(() => {
    if (perks) {
      const sortedTree = sortPerks(perks);
      setPerkTree(sortedTree);
      setFilteredTree(sortedTree);
    }
  }, [perks]);

  // Oraganizes the perks from a perk list into attribute and skill arrays corresponding to its requirements
  const sortPerks = (perkList: Perk[]) => {
    if (perkList) {
      const newGeneralPerks = { general: [] };
      const newCyberneticaPerks = {
        chromebits: [],
        hardwired: [],
        motorized: [],
        networked: [],
      };
      const newEsotericaPerks = {
        gestalt: [],
        godhead: [],
        mysticism: [],
        outerworld: [],
      };
      const newPeacePerks = {
        barter: [],
        erudition: [],
        rhetoric: [],
        treatment: [],
      };
      const newViolencePerks = {
        assault: [],
        shooting: [],
        subterfuge: [],
        threshold: [],
      };

      perkList.forEach((perk) => {
        if (!perk.requirements || !Object.keys(perk.requirements).length) {
          newGeneralPerks.general.push(perk);
        } else {
          Object.entries(perk.requirements).map(([attribute, { skills }]) => {
            Object.entries(skills).map(([skill]) => {
              if (attribute === 'cybernetica') {
                newCyberneticaPerks[skill as keyof CyberneticaPerks].push(perk);
              } else if (attribute === 'esoterica') {
                newEsotericaPerks[skill as keyof EsotericaPerks].push(perk);
              } else if (attribute === 'peace') {
                newPeacePerks[skill as keyof PeacePerks].push(perk);
              } else if (attribute === 'violence') {
                newViolencePerks[skill as keyof ViolencePerks].push(perk);
              }
            });
          });
        }
      });

      return {
        generalPerks: newGeneralPerks,
        cyberneticaPerks: newCyberneticaPerks,
        esotericaPerks: newEsotericaPerks,
        peacePerks: newPeacePerks,
        violencePerks: newViolencePerks,
      };
    }
  };

  //Filters a perk list while comparing it against a character's attribute tree returning only perks who's requirements are met by the attribute tree
  const getSatisfiedPerks = (attributeTree: AttributeTree) => {
    const newFilteredPerks = perks.map((perk) => {
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
      newFilteredPerks.filter((perk) => !!perk),
    );
    setFilteredTree(satisfiedPerkTree);
  };

  const filterByQuery = (tree: Partial<PerkTree>, query: string) => {
    const newFilteredPerks: Partial<PerkTree> = JSON.parse(
      JSON.stringify(tree),
    );
    Object.entries(tree).map(([attribute, skills]) => {
      Object.entries(skills).map(
        ([skill, perkList]) =>
          (newFilteredPerks[attribute as keyof PerkTree][skill] = !query
            ? perkList
            : perkList.filter((perk) =>
                perk.name?.toLowerCase().includes(query.toLowerCase()),
              )),
      );
    });
    setFilteredTree(newFilteredPerks);
  };

  const resetPerks = () => {
    setFilteredTree(perkTree);
  };
  //Filters the perk tree to return only perks of a specified attribute
  const handleFilter = (attribute: string, query: string) => {
    if (query && !attribute) {
      filterByQuery(perkTree, query);
    } else if (!query && attribute) {
      const perks = perkTree[attribute as keyof PerkTree];
      setFilteredTree({ [attribute as keyof PerkTree]: perks });
    } else if (!query && !attribute) {
      resetPerks();
    } else {
      const perks = perkTree[attribute as keyof PerkTree];
      const newTree = { [attribute as keyof PerkTree]: perks };
      filterByQuery(newTree, query);
    }
  };

  return {
    filteredTree,
    getSatisfiedPerks,
    sortPerks,
    resetPerks,
    handleFilter,
    isLoading,
    isPending,
  };
};

export default usePerks;
