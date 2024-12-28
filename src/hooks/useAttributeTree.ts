import { useState } from 'react';

interface Skill {
  points: number;
}

interface Attribute {
  points: number;
  skills: Record<string, Skill>;
}

export interface AttributeTree {
  cybernetica: Attribute;
  esoterica: Attribute;
  peace: Attribute;
  violence: Attribute;
}

const useAttributeTree = (partialTree?: Partial<AttributeTree>) => {
  const emptyAttributeTree: AttributeTree = {
    cybernetica: {
      points: 0,
      skills: {
        chromebits: { points: 0 },
        hardwired: { points: 0 },
        motorized: { points: 0 },
        networked: { points: 0 },
      },
    },
    esoterica: {
      points: 0,
      skills: {
        gestalt: { points: 0 },
        godhead: { points: 0 },
        mysticism: { points: 0 },
        outerworld: { points: 0 },
      },
    },
    peace: {
      points: 0,
      skills: {
        barter: { points: 0 },
        erudition: { points: 0 },
        rhetoric: { points: 0 },
        treatment: { points: 0 },
      },
    },
    violence: {
      points: 0,
      skills: {
        assault: { points: 0 },
        shooting: { points: 0 },
        subterfuge: { points: 0 },
        threshold: { points: 0 },
      },
    },
  };

  //Takes a partial attribute tree and returns a full tree including all fields where the point values are zero
  const structureTree = (partialTree: Partial<AttributeTree>) => {
    const updatedTree: AttributeTree = JSON.parse(
      JSON.stringify(emptyAttributeTree),
    );

    Object.entries(partialTree).forEach(([attribute, { points, skills }]) => {
      if (updatedTree[attribute as keyof AttributeTree]) {
        updatedTree[attribute as keyof AttributeTree].points = points;
      }
      Object.entries(skills).map(([skill, { points }]) => {
        if (updatedTree[attribute as keyof AttributeTree].skills[skill]) {
          updatedTree[attribute as keyof AttributeTree].skills[skill].points =
            points;
        }
      });
    });
    return updatedTree;
  };

  const [attributeTree, setAttributeTree] = useState<AttributeTree>(
    partialTree ? structureTree(partialTree) : emptyAttributeTree,
  );

  //Returns the total number of attribute points found in an attribute tree
  const getAttributePoints = () => {
    return Object.entries(attributeTree).reduce(
      (total, [_, { points }]) => total + points,
      0,
    );
  };

  //Returns the total number of skill points found in an attribute tree
  const getSkillPoints = () => {
    return Object.values(attributeTree).reduce(
      (total: number, attribute: Attribute) => {
        const skillPoints = Object.values(attribute.skills).reduce(
          (skillTotal, { points }) => {
            return skillTotal + points;
          },
          0,
        );
        return total + skillPoints;
      },
      0,
    );
  };

  //Returns the number of points attributed to a specific attribute or skill
  const getPoints = (
    attribute: keyof AttributeTree,
    skill?: string,
  ): number => {
    if (skill) {
      return attributeTree[attribute]?.skills[skill]?.points || 0;
    }
    return attributeTree[attribute]?.points || 0;
  };

  // Update points for a specific attribute or skill
  const updatePoints = (
    attribute: keyof AttributeTree,
    points: number,
    skill?: string,
  ) => {
    setAttributeTree((prevTree) => {
      const updatedTree = { ...prevTree };

      if (skill) {
        const skillZeroCase =
          prevTree[attribute].skills[skill].points === 1 && points === 1;

        updatedTree[attribute] = {
          ...prevTree[attribute],
          skills: {
            ...prevTree[attribute].skills,
            [skill]: { points: skillZeroCase ? 0 : points },
          },
        };
      } else {
        const attributeZeroCase =
          prevTree[attribute].points === 1 && points === 1;

        updatedTree[attribute] = {
          ...prevTree[attribute],
          points: attributeZeroCase ? 0 : points,
        };
      }

      return updatedTree;
    });
  };

  // Remove the attribute and skill fields from a tree where the point values are 0
  const destructureTree = () => {
    const result: Partial<AttributeTree> = {};

    for (const [attributeKey, attributeValue] of Object.entries(
      attributeTree,
    )) {
      const nonZeroSkills: Record<string, Skill> = Object.fromEntries(
        Object.entries(attributeValue.skills).filter(
          ([, skill]) => skill.points > 0,
        ),
      );

      if (attributeValue.points > 0 || Object.keys(nonZeroSkills).length > 0) {
        result[attributeKey as keyof AttributeTree] = {
          points: attributeValue.points,
          skills: nonZeroSkills,
        };
      }
    }

    return result;
  };

  const stats = {
    health: 10 + attributeTree.violence.skills.threshold.points * 2,
    sanity: 5 + attributeTree.esoterica.skills.mysticism.points * 2,
    speed: 4 + attributeTree.violence.skills.assault.points * 2,
    cyber: 4 + attributeTree.cybernetica.skills.chromebits.points * 2,
    equip: 10 + attributeTree.violence.skills.threshold.points * 2,
  };

  return {
    tree: attributeTree,
    getAttributePoints,
    getSkillPoints,
    getPoints,
    updatePoints,
    destructureTree,
    structureTree,
    stats,
  };
};

export default useAttributeTree;
