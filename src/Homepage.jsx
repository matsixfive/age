import { useEffect, useState, useRef } from "react";

import AgeSection from "./AgeSection";
import Footer from "./Footer";

import styles from "./homepage.module.scss";

import {findDivisions} from "./lib/findDivisions";

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

	const [showDateSelect, setShowDateSelect] = useState(false);
	const [targetAge, setTargetAge] = useState(18);

	

	// 31/01/2006 03:02:00 in epoch time
	const myBirthday = 1138676554936;
	const [birthday, setBirthday] = useState({
		date: myBirthday,
		time: 0,
		dateTime: myBirthday,
	});

	const epochToDays = 86400000;
	const oneYearMs = 31557600000;

	const fps = 53; // odd number gives more random ms digits

	let birthdayRenderer = useRef();

	useEffect(() => {
		clearInterval(birthdayRenderer.current);
		setCanShow(true);

		birthdayRenderer.current = setInterval(() => {
			const epochAge = Date.now() - birthday.dateTime;

			const divisions = findDivisions(epochAge);
			setFormattedAge(divisions);

			const targetYears =
				divisions.years < 0
					? 0
					: divisions.years < 18
					? 18
					: Math.ceil(divisions.years / 10) * 10;
			setTargetAge(targetYears);

			// 18 years in days - current age in days
			// one year is 31557600000 ms
			setYearsLeft(
				(
					(oneYearMs * targetYears) / epochToDays -
					epochAge / epochToDays
				).toFixed(6)
			);
		}, 1000 / fps);
	}, [birthday.dateTime]);
	return (
		<div style={{ minHeight: "100vh", position: "relative" }}>
			{canShow ? (
				<main className={styles.container}>
					{`${birthday.dateTime === myBirthday ? "I'm" : "You're"} `}
					{birthday.dateTime > Date.now() ? (
						" not born yet..."
					) : (
						<>
							<AgeSection
								age={formattedAge.years}
								timePeriod={"year"}
								styleName={styles.timeYear}
								singular
							/>
							{", "}
							<AgeSection
								age={formattedAge.days}
								timePeriod={"day"}
								styleName={styles.timeDay}
								singular
							/>
							{", "}
							<AgeSection
								age={formattedAge.hours}
								timePeriod={"hour"}
								styleName={styles.timeHour}
								singular
							/>
							{", "}
							<AgeSection
								age={formattedAge.minutes}
								timePeriod={"minute"}
								styleName={styles.timeMinute}
								singular
							/>
							{", "}
							<AgeSection
								age={formattedAge.seconds}
								timePeriod={"second"}
								styleName={styles.timeSecond}
								singular
								chars={2}
							/>
							{", and "}
							<AgeSection
								age={formattedAge.milliseconds}
								timePeriod={"millisecond"}
								styleName={styles.timeMillisecond}
								chars={3}
							/>
							{" old."}
						</>
					)}
					{" There are "}
					<span className={styles.timeLeft.concat(` ${styles.time}`)}>
						{yearsLeft}
					</span>
					{` days until ${
						birthday.dateTime === myBirthday ? "I'm" : "you're"
					} ${targetAge !== 0 ? targetAge + " years old" : " born"}.`}
				</main>
			) : null}
			<Footer
				showDateSelect={showDateSelect}
				setShowDateSelect={setShowDateSelect}
				birthday={birthday}
				setBirthday={setBirthday}
			/>
		</div>
	);
}
