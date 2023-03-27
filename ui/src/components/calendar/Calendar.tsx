import { Month, MonthlyAppearance, MONTHS } from "../../types";
import cn from "clsx";
import styles from "./Calendar.module.scss";
import useGameState from "../../hooks/useGameState";

interface CalendarProps {
  months?: MonthlyAppearance;
  onMonthClick?: (month: Month) => void;
}

const toTitleCase = (str: string) =>
  str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.slice(1));

const Calendar = ({ months, onMonthClick }: CalendarProps) => {
  const gameState = useGameState();

  const handleMonthClick = (month: Month) => {
    if (!onMonthClick) return;
    onMonthClick(month);
  };

  return (
    <div className={styles["calendar"]}>
      {MONTHS.map((month) => (
        <button
          key={month}
          className={cn({
            [styles["active"]]: months && months[month],
            [styles["current"]]: month === gameState.month,
          })}
          disabled={!onMonthClick}
          onClick={() => handleMonthClick(month)}
        >
          {toTitleCase(month)}
        </button>
      ))}
    </div>
  );
};

export default Calendar;
