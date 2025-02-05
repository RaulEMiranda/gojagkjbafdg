export interface Pokemon {
  name: string;
  abilities: Abilities[],
  image: string[];
  types: string[];
}

interface Abilities {
  ability: {
    name: string;
    url: string;
  },
  is_hidden: boolean;
  slot: number;
}

