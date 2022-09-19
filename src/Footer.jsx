import styles from "./homepage.module.scss";

export default function Footer({
	showDateSelect,
	setShowDateSelect,
	birthday,
	setBirthday,
}) {
	return (
		<div className={styles.footer}>
			{/* {showDateSelect ? ( */}
			<div
				className={styles.dateButtons}
				style={showDateSelect ? { display: "flex" } : { display: "none" }}
			>
				<input
					type="date"
					onChange={(e) => {
						console.log(Date.parse(e.target.valueAsDate));
						setBirthday({
							date: Date.parse(e.target.valueAsDate) || 0,
							time: birthday.time,
							dateTime: birthday.dateTime,
						});
					}}
				/>
				<input
					type="time"
					onChange={(e) => {
						console.log(
							Date.parse(e.target.valueAsDate),
							new Date().getTimezoneOffset() * 1000
						);
						setBirthday({
							date: birthday.date,
							time: Date.parse(e.target.valueAsDate),
							dateTime: birthday.dateTime,
						});
					}}
				/>
				<input
					type="button"
					value={"Apply"}
					onClick={() => {
						console.table(birthday);
						setBirthday({
							date: birthday.date,
							time: birthday.time,
							dateTime:
								birthday.date +
								birthday.time +
								new Date().getTimezoneOffset() * 6e4,
						});
					}}
					className={styles.applyButton}
				/>
			</div>
			{/* ) : null} */}
			<button
				className={styles.changeButton}
				onClick={() => setShowDateSelect(!showDateSelect)}
			>
				{showDateSelect ? "close" : "change"}
			</button>
		</div>
	);
}
