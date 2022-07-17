import React, { useEffect , useState } from "react";

interface PrefArray {
	prefCode: number[];
	prefName: string[];
}

interface PrefValue {
	prefCode: number;
	prefName: string[];
}

const GetPrefsList = () => {
	const[Prefs, setPrefs] = useState([]);
	// const[Prefs, setPrefs] = useState<PrefArray>({Prefs: new Array(47).fill(0, null)});
	const[isDrew, reverseIsDrew] = useState(false);

	const handleClick = () => {
		reverseIsDrew(!isDrew);
		console.log(isDrew);
	}

	if (isDrew === true) {
		fetch("https://opendata.resas-portal.go.jp/api/v1/prefectures", {
			headers: {
			   "x-api-key": "5z07nougGOxYPvf26JK69uVftaVNc00AuZPmbnN9"
		    }
		})
		.then(res => res.json())
		.then(data => {
			console.log(data.result);
			setPrefs(data.result);
			reverseIsDrew(false);
		})
	}
	return (
		<div className="GetPrefList">
			<input type="checkbox" onClick={handleClick}/>
			<div className="Prefboxlist">{Prefs.map((data: PrefValue) => (
				<div className="Singleset" key={data.prefCode}>
					<input type="checkbox" onClick={handleClick}/>
					<div className="Prefname">{data.prefName}</div>
				</div>
			))}</div>
		</div>
	);
}

export default GetPrefsList;
