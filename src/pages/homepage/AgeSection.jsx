import styles from "./homepage.module.scss";

export default function AgeSection(props) {
  return (
    <span style={{ whiteSpace: "nowrap", overflowWrap: "anywhere" }}>
      <span className={props.styleName.concat(` ${styles.time}`)}>
        {props.age.toString().padStart(props.pad, "0")}
      </span>{" "}
      {props.timePeriod}
      {props.age === 1 && props.single ? null : "s"}
    </span>
  );
}
