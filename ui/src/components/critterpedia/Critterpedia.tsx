import { fishes, insects, seaCreatures } from "../../data";
import styles from "./Critterpedia.module.scss";
import cn from "clsx";
import { Creature } from "../../types";
import useFoundState from "../../hooks/useFoundState";
import { Divider, Stack, Tooltip, Typography } from "@mui/material";

interface CritterpediaPageProps {
  creatures: Creature[];
  title: string;
}

const CritterpediaPage = ({ creatures, title }: CritterpediaPageProps) => {
  const foundState = useFoundState();

  return (
    <div>
      <Typography variant="h5" component="h3">
        {title}
      </Typography>
      <div className={styles["critterpedia__category"]}>
        {creatures.map((creature) => (
          <Tooltip title={creature.name} arrow key={creature.internal_id}>
            <div
              className={cn(
                styles["critterpedia__tile"],
                foundState.isFound(creature.internal_id) || styles["hidden"]
              )}
            >
              <div
                className={styles["critterpedia__image"]}
                style={{
                  backgroundImage: `url(${creature.critterpedia_image})`,
                }}
              ></div>
            </div>
          </Tooltip>
        ))}
      </div>
    </div>
  );
};

const Critterpedia = () => {
  return (
    <div className={styles["critterpedia"]}>
      <Typography variant="h4" component="h2">
        Critterpedia
      </Typography>
      <Stack spacing={1}>
        <CritterpediaPage creatures={fishes} title="Fish" />
        <CritterpediaPage creatures={insects} title="Insects" />
        <CritterpediaPage creatures={seaCreatures} title="Sea Creatures" />
      </Stack>
    </div>
  );
};

export default Critterpedia;
