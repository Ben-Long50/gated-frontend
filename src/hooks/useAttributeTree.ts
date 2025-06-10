import { AttributeTree } from '../types/attributeTree';

const useAttributeTree = () => {
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

  return {
    emptyAttributeTree,
  };
};

export default useAttributeTree;
