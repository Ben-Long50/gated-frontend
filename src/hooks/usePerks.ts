import { useState } from 'react';
import { AttributeTree } from './useAttributeTree';

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
                newCyberneticaPerks[skill].push(perk);
              } else if (attribute === 'esoterica') {
                newEsotericaPerks[skill].push(perk);
              } else if (attribute === 'peace') {
                newPeacePerks[skill].push(perk);
              } else if (attribute === 'violence') {
                newViolencePerks[skill].push(perk);
              }
            });
          });
        }
      });
      setPerkTree({
        generalPerks: newGeneralPerks,
        cyberneticaPerks: newCyberneticaPerks,
        esotericaPerks: newEsotericaPerks,
        peacePerks: newPeacePerks,
        violencePerks: newViolencePerks,
      });
      setFilteredTree({
        generalPerks: newGeneralPerks,
        cyberneticaPerks: newCyberneticaPerks,
        esotericaPerks: newEsotericaPerks,
        peacePerks: newPeacePerks,
        violencePerks: newViolencePerks,
      });
    }
  };

  //Filters a perk list while comparing it against a character's attribute tree returning only perks who's requirements are met by the attribute tree
  const filterPerks = (perkList: Perk[], attributeTree: AttributeTree) => {
    if (perkList) {
      const newFilteredPerks = perkList.map((perk) => {
        let requirementsMet = true;
        Object.entries(perk.requirements).map(
          ([attribute, { points, skills }]) => {
            if (attributeTree[attribute].points >= points) {
              return Object.entries(skills).map(([skill, { points }]) => {
                if (attributeTree[attribute].skills[skill].points < points) {
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
      sortPerks(newFilteredPerks.filter((perk) => !!perk));
    }
  };

  //Filters the perk tree to return only perks of a specified attribute
  const handleFilter = (attribute: string) => {
    const perks = perkTree[attribute];
    setFilteredTree({ [attribute]: perks });
  };

  return {
    filteredTree,
    sortPerks,
    filterPerks,
    handleFilter,
  };
};

export default usePerks;
