import React, { useEffect , useState } from "react";
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

interface PrefArray {
	prefCode: number[];
	prefName: string[];
}

interface PrefValue {
	prefCode: number;
	prefName: string[];
}

interface PrefDataArrayType {
	PrefDataArray: {
		year: number;
		value: number;
	}[];
}

const GetPrefsList = () => {
	const[Prefs, setPrefs] = useState([]);
	const[Populations, setPopulations] = useState<number[]>([]);
	const[Years, setYears] = useState<number[]>([]);
	// const [PrefData, setPrefData] = useState<PrefDataArrayTypae>({
	// 	PrefDataArray: {0, 0}, {0, 0}
	// 	}
	// });
	const	categories:any = [];
	// const[PrefData, setPrefData] = useState<PrefDataArrayType>({PrefData: newArray(18).fill(0, 0)});
	// const[Prefs, setPrefs] = useState<PrefArray>({Prefs: new Array(47).fill(0, null)});
	// const[PrefData, setPrefData] = useState<PrefDataArray>({
	// 	year:  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	// 	value: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
	// });
	const[isDrew, reverseIsDrew] = useState(true);

	const handleClick = (index: number) => {
		//apiでチェックボックスから受け取ったindex番目の都道府県のデータを取得しています。
		fetch("https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?prefCode=" + index, {
			headers: {
			   "x-api-key": "5z07nougGOxYPvf26JK69uVftaVNc00AuZPmbnN9"
		    }
		})
		.then(res => res.json())
		.then(data => {
			let years: number[] = [];
			//apiで受け取ったデータの年数リストを宣言した配列yearsに格納してます
			Object.keys(data.result.data[0].data).forEach((value) => {
				years.push(data.result.data[0].data[value].value);
				setYears(years);
			});
			let values: number[] = [];
			//apiで受け取ったデータの人口リストを宣言した配列valuesに格納してます
			Object.keys(data.result.data[0].data).forEach((value) => {
				values.push(data.result.data[0].data[value].value);
				setPopulations(values);
				setYears(years);
			});
		})
	}

	if (isDrew === true) {
		//apiで都道府県名と都道府県コードを受け取りstateのPrefsに格納しています
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

	//以下のoptionsはレンダリングするグラフの基本設定をしています
	const options: Highcharts.Options = {
		title: {
		  text: "人口推移",
		},
		xAxis: {
		  title: {
			text: "年度",
		  },
		  categories: ['1960', '1965', '1970', '1975', '1980', '1985', '1990', '1995', '2000',
		  				'2005', '2010', '2015', '2020', '2025', '2030', '2035', '2040', '2045'],
		//   categories: Years.toString(),
		},
		yAxis: {
		  title: {
			text: "人口",
		  },
		},
		plotOptions: {
			series: {
				label: {
					connectorAllowed: false
				},
			}
		},
		// 都道府県を一つも選んでいない場合との分岐条件
		series: [{ type: "line", name: "都道府県名", data: Populations}],
	};
	return (
		<>
			<div className="GetPrefList">
				<div className="Prefboxlist">{Prefs.map((data: PrefValue) => (
					<div className="Singleset" key={data.prefCode}>
						<input type="checkbox" onClick={() => handleClick(data.prefCode)}/>
						<div className="Prefname">{data.prefName}</div>
					</div>
				))}</div>
			</div>
			<div className="GraphArea">
				<HighchartsReact highcharts={Highcharts} options={options} />
			</div>
		</>
	);
}

export default GetPrefsList;
