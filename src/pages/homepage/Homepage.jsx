import { useEffect, useState } from "react";

import AgeSection from "./AgeSection";

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
    };
  };

  useEffect(() => {
    setCanShow(true);

    // 31/01/2006 03:02:00 in epoch time
    const birthday = 1138676554936;
    const epochToYears = 31557600000;

    const fps = 53; // odd number gives more random ms digits
    setInterval(() => {
      let epochAge = Date.now() - birthday;
      setYearsLeft((18 - epochAge / epochToYears).toFixed(9));
      setFormattedAge(findDivisions(epochAge));
    }, 1000 / fps);
  }, []);
  return (
    <>
      {canShow ? (
        <div className={s.container}>
          {"I'm "}
          <AgeSection
            age={formattedAge.years}
            timePeriod={"year"}
            styleName={s.timeYear}
          />
          {", "}
          <AgeSection
            age={formattedAge.days}
            timePeriod={"day"}
            styleName={s.timeDay}
          />
          {", "}
          <AgeSection
            age={formattedAge.hours}
            timePeriod={"hour"}
            styleName={s.timeHour}
          />
          {", "}
          <AgeSection
            age={formattedAge.minutes}
            timePeriod={"minute"}
            styleName={s.timeMinute}
          />
          {", "}
          <AgeSection
            age={formattedAge.seconds}
            timePeriod={"second"}
            styleName={s.timeSecond}
          />
          {", and "}
          <AgeSection
            age={formattedAge.milliseconds}
            timePeriod={"millisecond"}
            styleName={s.timeMillisecond}
          />
          {" old. There are "}
          <span className={s.timeLeft.concat(` ${s.time}`)}>{yearsLeft}</span>
          {" years until I'm 18 years old."}
        </div>
      ) : null}
    </>
  );
}
