interface MonthlyAppearance {
  jan: boolean;
  feb: boolean;
  mar: boolean;
  apr: boolean;
  may: boolean;
  jun: boolean;
  jul: boolean;
  aug: boolean;
  sep: boolean;
  oct: boolean;
  nov: boolean;
  dec: boolean;
}

interface Creature {
  id: number;
  name: string;
  image: string;
  critterpedia_image: string;
  furniture_image: string;
  sell?: number;
  location: string;
  size: string;
  description: string;
  internal_id: number;
  north: MonthlyAppearance;
  south: MonthlyAppearance;
  time: string;
  catches_required: number;
  spawn_rates: string;
}

interface Fish extends Creature {
  location: string;
  shadow: string;
  difficulty: string;
  vision: string;
}

interface Insect extends Creature {
  weather: string;
}

interface SeaCreature extends Creature {
  shadow: string;
  speed: string;
}

interface Fossil {
  name: string;
  image: string;
  sell: number;
  group: string;
  size: string;
  room: number;
  description: string;
  internal_id: number;
}

interface Artwork {
  name: string;
  image: string;
  high_res: string;
  genuine: boolean;
  category: string;
  buy: number;
  sell?: number;
  size: string;
  title: string;
  artist: string;
  description: string;
  internal_id: number;
}

const MONTHS = [
  "jan",
  "feb",
  "mar",
  "apr",
  "may",
  "jun",
  "jul",
  "aug",
  "sep",
  "oct",
  "nov",
  "dec",
] as const;

const FULL_MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
] as const;

type Month = typeof MONTHS[number];
type LongMonth = typeof FULL_MONTHS[number];

const MONTH_MAP: Record<Month, LongMonth> = {
  jan: "January",
  feb: "February",
  mar: "March",
  apr: "April",
  may: "May",
  jun: "June",
  jul: "July",
  aug: "August",
  sep: "September",
  oct: "October",
  nov: "November",
  dec: "December",
};

type Hemisphere = "north" | "south";

export { MONTHS, FULL_MONTHS, MONTH_MAP };

export type {
  Fish,
  Insect,
  SeaCreature,
  Fossil,
  Artwork,
  Month,
  LongMonth,
  Hemisphere,
  MonthlyAppearance,
  Creature,
};
