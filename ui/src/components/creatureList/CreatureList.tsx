import { Divider, Stack, Typography } from "@mui/material";
import { fishes, insects, seaCreatures } from "../../data";
import useFoundState from "../../hooks/useFoundState";
import useGameState from "../../hooks/useGameState";
import { Creature as CreatureType } from "../../types";
import Creature from "../creature/Creature";

const categories = {
  fishes: fishes,
  insects: insects,
  seaCreatures: seaCreatures,
};

interface CreatureListProps {
  category: keyof typeof categories;
  filters: {
    hideDiscovered: boolean;
    hideUnavailable: boolean;
  };
  title: string;
}

const CreatureList = ({ category, filters, title }: CreatureListProps) => {
  const gameState = useGameState();
  const foundState = useFoundState();

  let data: CreatureType[] = categories[category];
  if (filters.hideUnavailable) {
    data = data.filter(
      (creature) => creature[gameState.hemisphere][gameState.month]
    );
  }
  if (filters.hideDiscovered) {
    data = data.filter((creature) => !foundState.isFound(creature.internal_id));
  }

  return (
    <>
      <Typography variant="h4" component="h2">
        {title}
      </Typography>
      <Stack divider={<Divider />}>
        {data.map((creature) => (
          <Creature
            creature={creature}
            key={`creature_${creature.internal_id}`}
          />
        ))}
      </Stack>
    </>
  );
};

export default CreatureList;
