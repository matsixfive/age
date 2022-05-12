import { useEffect, useState } from "react";

import s from "./homepage.module.css";

export default function Homepage() {
  const [canShow, setCanShow] = useState(false);
  const [formattedAge, setFormattedAge] = useState({
    years: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    milliseconds: 0,
  });
  const [yearsLeft, setYearsLeft] = useState();

  const findDivisions = (ms) => {
    let years = ms / 1000 / 60 / 60 / 24 / 365.25;
    let yearsRound = Math.floor(years);
    let remainder = (years - yearsRound) * 1000 * 60 * 60 * 24 * 365.25;

    let days = remainder / 1000 / 60 / 60 / 24;
    let daysRound = Math.floor(days);
    remainder = (days - daysRound) * 1000 * 60 * 60 * 24;

    let hours = remainder / 1000 / 60 / 60;
    let hoursRound = Math.floor(hours);
    remainder = (hours - hoursRound) * 1000 * 60 * 60;

    let minutes = remainder / 1000 / 60;
    let minutesRound = Math.floor(minutes);
    remainder = (minutes - minutesRound) * 1000 * 60;

    let seconds = remainder / 1000;
    let secondsRound = Math.floor(seconds);
    remainder = (seconds - secondsRound) * 1000;

    let milliseconds = remainder;
    let millisecondsRound = Math.floor(milliseconds);
    remainder = milliseconds - millisecondsRound;

    let all = {
      years: yearsRound,
      days: daysRound,
      hours: hoursRound,
      minutes: minutesRound,
      seconds: secondsRound,
      milliseconds: millisecondsRound,
    };

    console.log(all);

    return all;
  };

  useEffect(() => {
    setCanShow(true);

    const birthday = 1138676554936;

    setInterval(() => {
      let age = Date.now() - birthday;
      setYearsLeft((18 - age / 1000 / 60 / 60 / 24 / 365.25).toFixed(9));
      setFormattedAge(findDivisions(age));
    }, 8);
  }, []);
  return (
    <>
      {canShow ? (
        <div>
          {"I'm "}
          <span className={s.year}>{formattedAge.years.toString()}</span>
          {" year"}
          {formattedAge.years == 1 ? null : "s"}
          {", "}
          <span className={s.day}>{formattedAge.days.toString()}</span>
          {" day"}
          {formattedAge.days == 1 ? null : "s"}
          {", "}
          <span className={s.hour}>{formattedAge.hours.toString()}</span>
          {" hour"}
          {formattedAge.hours == 1 ? null : "s"}
          {", "}
          <span className={s.minute}>{formattedAge.minutes.toString()}</span>
          {" minute"}
          {formattedAge.minutes == 1 ? null : "s"}
          {", "}
          <span className={s.second}>{formattedAge.seconds.toString().padStart(2, "0")}</span>
          {" second"}
          {formattedAge.seconds == 1 ? null : "s"}
          {", and "}
          <span className={s.millisecond}>{formattedAge.milliseconds.toString().padStart(3, "0")}</span>
          {" milliseconds old. There are "}
          {yearsLeft}
          {" years until I'm 18 years old."}
        </div>
      ) : null}
    </>
  );
}
