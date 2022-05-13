import s from "./homepage.module.css";

export default function AgeSection(props) {
  const setPadding = () => {
    if (props.timePeriod === "millisecond") {
      return props.age.toString().padStart(3, "0");
    } else if (props.timePeriod === "second") {
      return props.age.toString().padStart(2, "0");
    } else {
      return props.age.toString();
    }
  };

  return (
    <span style={{ whiteSpace: "nowrap", overflowWrap: "anywhere" }}>
      <span className={props.styleName.concat(` ${s.time}`)}>
        {setPadding()}
      </span>{" "}
      {props.timePeriod}
      {props.age === 1 ? null : "s"}
    </span>
  );
}
