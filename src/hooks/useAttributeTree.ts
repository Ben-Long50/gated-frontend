import { useState } from 'react';

interface Skill {
  points: number;
}

interface Attribute {
  points: number;
  skills: Record<string, Skill>;
}

interface AttributeTree {
  cybernetica: Attribute;
  esoterica: Attribute;
  peace: Attribute;
  violence: Attribute;
}

const useAttributeTree = (tree?: Partial<AttributeTree>) => {
  const [attributeTree, setAttributeTree] = useState(
    tree || {
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
    },
  );

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
    setAttributeTree((prev) => {
      const attributeZeroCase =
        attributeTree[attribute]?.points === 1 && points === 1;
      const skillZeroCase =
        attributeTree[attribute]?.skills[skill]?.points === 1 && points === 1;

      const newAttribute = { ...prev[attribute] };

      if (skill) {
        newAttribute.skills = {
          ...newAttribute.skills,
          [skill]: { points: skillZeroCase ? 0 : points },
        };
      } else {
        newAttribute.points = attributeZeroCase ? 0 : points;
      }

      return {
        ...prev,
        [attribute]: newAttribute,
      };
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

  return {
    tree: attributeTree,
    getPoints,
    updatePoints,
    destructureTree,
  };
};

export default useAttributeTree;
