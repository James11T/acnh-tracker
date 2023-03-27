import React from "react";
import styles from "./Ring.module.scss";
import timeOverlay from "../../assets/time_overlay.png";

interface RingProperties {
  from?: number;
  to: number;
}

const toDp = (value: number, dps = 2) => value.toFixed(dps);

const Ring = ({ from = 0, to }: RingProperties) => {
  const [path, setPath] = React.useState<SVGPathElement | null>(null);

  const svgLength = path ? path.getTotalLength() : 0;
  const now = new Date();
  const dayProgress = (now.getHours() * 60 + now.getMinutes()) / (60 * 24);

  let length: number;
  if (to > from) {
    length = to - from;
  } else {
    length = 1 - from + to;
  }

  return (
    <svg
      width="128"
      height="128"
      viewBox="0 0 128 128"
      className={styles["ring"]}
    >
      <g fill="none" strokeWidth="20.517">
        <path
          className={styles["background-path"]}
          d="m64.042 10.061c23.796-0.48791 46.287 17.062 51.797 40.179 6.0552 22.306-4.2716 47.657-24.171 59.403-19.895 12.601-47.932 9.6621-64.69-6.9203-17.35-16.029-21.607-43.898-10.052-64.457 9.0874-17.07 27.736-28.358 47.116-28.205z"
          stroke="#dadada"
        />
        <path
          ref={(newRef) => setPath(newRef)}
          className={styles["path"]}
          style={{
            strokeDasharray: `${toDp(length * svgLength)}px ${toDp(
              (1 - length) * svgLength
            )}px`,
            transform: `rotate(${toDp(from * 360)}deg)`,
          }}
          d="m64.042 10.061c23.796-0.48791 46.287 17.062 51.797 40.179 6.0552 22.306-4.2716 47.657-24.171 59.403-19.895 12.601-47.932 9.6621-64.69-6.9203-17.35-16.029-21.607-43.898-10.052-64.457 9.0874-17.07 27.736-28.358 47.116-28.205z"
        />
        <path
          d="m64.042 10.061c23.796-0.48791 46.287 17.062 51.797 40.179 6.0552 22.306-4.2716 47.657-24.171 59.403-19.895 12.601-47.932 9.6621-64.69-6.9203-17.35-16.029-21.607-43.898-10.052-64.457 9.0874-17.07 27.736-28.358 47.116-28.205z"
          stroke="black"
          style={{
            strokeDasharray: `5px ${svgLength - 5}px`,
            transform: `rotate(${toDp(dayProgress * 360)}deg)`,
            opacity: 0.5,
          }}
        />
        <image
          id="image23988"
          width="128"
          height="128"
          preserveAspectRatio="none"
          href={timeOverlay}
        />
      </g>
    </svg>
  );
};

export default Ring;
