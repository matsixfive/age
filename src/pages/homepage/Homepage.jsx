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

    return {
      years: yearsRound,
      days: daysRound,
      hours: hoursRound,
      minutes: minutesRound,
      seconds: secondsRound,
      milliseconds: millisecondsRound,
    }
  };

  useEffect(() => {
    setCanShow(true);

    const birthday = 1138676554936;

    const fps = 50;
    setInterval(() => {
      let age = Date.now() - birthday;
      setYearsLeft((18 - (age / (31557600000))).toFixed(9));
      setFormattedAge(findDivisions(age));
    }, 1000 / fps);
  }, []);
  return (
    <>
      {canShow ? (
        <div className={s.container}>
          {"I'm "}
          <span className={s.timeYear.concat(` ${s.time}`)}>
            {formattedAge.years.toString()}
          </span>
          {" "}
          {formattedAge.years === 1 ? "year" : "years"}
          {", "}
          <span className={s.timeDay.concat(` ${s.time}`)}>
            {formattedAge.days.toString()}
          </span>
          {" "}
          {formattedAge.days === 1 ? "day" : "days"}
          {", "}
          <span className={s.timeHour.concat(` ${s.time}`)}>
            {formattedAge.hours.toString()}
          </span>
          {" "}
          {formattedAge.hours === 1 ? "hour" : "hours"}
          {", "}
          <span className={s.timeMinute.concat(` ${s.time}`)}>
            {formattedAge.minutes.toString()}
          </span>
          {" "}
          {formattedAge.minutes === 1 ? "minute" : "minutes"}
          {", "}
          <span className={s.timeSecond.concat(` ${s.time}`)}>
            {formattedAge.seconds.toString().padStart(2, "0")}
          </span>
          {" "}
          {formattedAge.seconds === 1 ? "second" : "seconds"}
          {", and "}
          <span className={s.timeMillisecond.concat(` ${s.time}`)}>
            {formattedAge.milliseconds.toString().padStart(3, "0")}
          </span>
          {" milliseconds old. There are "}
          <span className={s.timeLeft.concat(` ${s.time}`)}>{yearsLeft}</span>
          {" years until I'm 18 years old."}
        </div>
      ) : null}
    </>
  );
}
