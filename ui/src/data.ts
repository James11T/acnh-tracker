import rawFish from "./assets/acnh/fish.json";
import rawInsects from "./assets/acnh/insects.json";
import rawSeaCreatures from "./assets/acnh/sea_creatures.json";
import rawFossils from "./assets/acnh/fossils.json";
import rawArtwork from "./assets/acnh/artwork.json";
import { Artwork, Fish, Fossil, Insect, SeaCreature } from "./types";

const fishes = rawFish as Fish[];
const insects = rawInsects as Insect[];
const seaCreatures = rawSeaCreatures as SeaCreature[];
const fossils = rawFossils as Fossil[];
const artwork = rawArtwork as Artwork[];

export { fishes, insects, seaCreatures, fossils, artwork };
