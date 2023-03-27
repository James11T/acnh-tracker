import { Creature as CreatureType } from "../../types";
import bell from "../../assets/bell_sm.png";
import cross from "../../assets/x.svg";
import check from "../../assets/check.svg";
import location from "../../assets/location.svg";
import clock from "../../assets/clock.svg";
import styles from "./Creature.module.scss";
import useGameState from "../../hooks/useGameState";
import Calendar from "../calendar/Calendar";
import Ring from "../ring/Ring";
import { Button } from "@mui/material";
import useFoundState from "../../hooks/useFoundState";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import WatchLaterRoundedIcon from "@mui/icons-material/WatchLaterRounded";

interface CreatureProps {
  creature: CreatureType;
}

const numberFormatter = new Intl.NumberFormat();

const Creature = ({ creature }: CreatureProps) => {
  const gameState = useGameState();
  const foundState = useFoundState();

  const available = creature[gameState.hemisphere][gameState.month];

  let from = 0;
  let to = 1;

  if (creature.time !== "*") {
    [from, to] = creature.time
      .split("-")
      .map(Number)
      .map((x) => x / 2400);
  }

  return (
    <div className={styles["creature"]}>
      <div className={styles["creature__image-container"]}>
        <img
          src={creature.image}
          alt=""
          className={styles["creature__image"]}
        />
        <Button
          size="small"
          sx={{ maxWidth: 120, width: "100%" }}
          onClick={() => foundState.toggleFound(creature.internal_id)}
        >
          {foundState.isFound(creature.internal_id)
            ? "Clear Caught"
            : "Mark Caught"}
        </Button>
      </div>
      <div className={styles["creature__details"]}>
        <span className={styles["creature__name"]}>{creature.name}</span>
        <div className={styles["creature__icon_value"]}>
          <img src={bell} alt="bell" className={styles["creature__icon"]} />
          {creature.sell
            ? numberFormatter.format(creature.sell)
            : "Doesn't sell"}
        </div>
        <div className={styles["creature__icon_value"]}>
          {available ? (
            <CheckRoundedIcon color="success" />
          ) : (
            <CloseRoundedIcon color="error" />
          )}
          {available ? "Available" : "Not Available"}
        </div>
        <div className={styles["creature__icon_value"]}>
          <LocationOnRoundedIcon color="primary" />
          {creature.location}
        </div>
        <div className={styles["creature__icon_value"]}>
          <WatchLaterRoundedIcon color="primary" />
          {creature.time === "*" ? "All day" : creature.time}
        </div>
      </div>
      <div className={styles["creature__graphics"]}>
        <Calendar months={creature[gameState.hemisphere]} />
        <Ring from={from} to={to} />
      </div>
    </div>
  );
};

export default Creature;
