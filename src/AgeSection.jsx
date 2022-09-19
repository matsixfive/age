import styles from "./homepage.module.scss";

export default function AgeSection({
  age: number,
  styleName,
  chars: pad,
  timePeriod,
  singular,
}) {
  return (
    <span style={
      // keep `2 hours` on the same line without breaking in the space (_) between
      { whiteSpace: "nowrap", overflowWrap: "anywhere" }}>
      <span className={styleName.concat(` ${styles.time}`)}>
        {
          // convert number to string
          number
            .toString()
            // minimum lenght of string, padded with '0'
            .padStart(pad, "0")
        }
      </span>
      {" " +
        timePeriod +
        // add 's' to end of `timePeriod` if the time is '1' and the `age` prop is `true`
        (number === 1 && singular ? null : "s")}
    </span>
  );
}
