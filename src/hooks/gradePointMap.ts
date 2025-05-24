const gradePointMap = {
  damage: (level: number) => Math.ceil(5 * (level * 0.1 + 1)),
  salvo: (level: number) => Math.ceil(5 * (level * 0.1 + 1)),
  flurry: (level: number) => Math.ceil(5 * (level * 0.1 + 1)),
  range: (level: number) => Math.ceil(50 * (1 / 2) ** level),
  magCapacity: (level: number) => Math.ceil(50 * (1 / 2) ** level),
  magCount: (level: number) => Math.ceil(5 * (level * 0.1 + 1)),
  power: (level: number) => Math.ceil(5 * (level * 0.1 + 1)),
  armor: (level: number) => Math.ceil(5 * (level * 0.1 + 1)),
  ward: (level: number) => Math.ceil(5 * (level * 0.1 + 1)),
  block: (level: number) => Math.ceil(5 * (level * 0.1 + 1)),
  speed: (level: number) => Math.ceil(2 * level),
  agility: (level: number) => Math.ceil(10 * level),
  hull: (level: number) => Math.ceil(5 * level),
  cargo: (level: number) => Math.ceil(5 * level),
  hangar: (level: number) => Math.ceil(10 * level),
  pass: (level: number) => Math.ceil(5 * level),
  weapon: (level: number) => Math.ceil(20 * level),
};

export default gradePointMap;
