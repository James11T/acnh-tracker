import world from "../../assets/world_bw.png";
import northHemisphere from "../../assets/north_hemisphere.png";
import southHemisphere from "../../assets/south_hemisphere.png";
import useGameState from "../../hooks/useGameState";
import styles from "./World.module.scss";

const World = () => {
  const gameState = useGameState();

  const handleWorldClick = () => {
    if (gameState.hemisphere === "north") {
      gameState.setHemisphere("south");
    } else {
      gameState.setHemisphere("north");
    }
  };

  return (
    <div className={styles["world"]} onClick={handleWorldClick}>
      <img src={world} alt="world" className={styles["world"]} />
      {gameState.hemisphere === "north" ? (
        <img
          src={northHemisphere}
          alt="north"
          className={styles["world__north"]}
        />
      ) : (
        <img
          src={southHemisphere}
          alt="south"
          className={styles["world__south"]}
        />
      )}
    </div>
  );
};

export default World;
