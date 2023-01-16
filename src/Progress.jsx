// import { useState } from "react";

import s from "./Progress.module.scss";

export default function Progress({ percentage }) {
	const displayPercent = Math.min(Math.max(percentage * 100, 0), 100).toFixed(
		2
	);
	return (
		<>
			<div
				className={s.bar}
				title={`${displayPercent}%`}>
				<div
					className={s.progress}
					style={{
						width: `${displayPercent}%`,
					}}></div>
				{/* {displayPercent}% */}
			</div>
			{/* <div style={{ display: "flex", justifyContent:"space-between" }}>
				<span>0</span>
				<span>72.27</span>
			</div> */}
		</>
	);
}
