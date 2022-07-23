import { chart } from "highcharts";
import React, { useEffect, useState } from "react";
// import { setUncaughtExceptionCaptureCallback } from "process";
import Graph from './Graph';

interface PrefValue {
  prefCode: number;
  prefName: string;
}

interface SeriesType {
	type: string;
	name: string;
	data: number[];
}

const GetPrefsList = () => {
  const [Prefs, setPrefs] = useState([]);
//   const [SeriesList, setSeriesList] = useState<Highcharts.SeriesOptionsType[]>(
//     []
//     );
	const [SeriesList, setSeriesList] = useState<SeriesType[]>([]);
  const handleClick = (index: number, prefname: string) => {
    //SeriesList内nameを全て検索し、該当する要素があった場合は、isExistedにtrueをたてる
	console.log("before", SeriesList);
    let isExisted = false;
    SeriesList.forEach((type: SeriesType) => {
      if (type.name === prefname) {
        isExisted = true;
      }
    });
	console.log(chart.length);

    if (!isExisted) {
      //apiでチェックボックスから受け取ったindex番目の都道府県のデータを取得しています。
      fetch(
        "https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?prefCode=" +
          index,
        {
          headers: {
            "x-api-key": "5z07nougGOxYPvf26JK69uVftaVNc00AuZPmbnN9",
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          const currentValues: number[] = [];
          //apiで受け取ったデータの人口リストを宣言した配列currentValuesに格納してます
          Object.keys(data.result.data[0].data).forEach((list: string) => {
            currentValues.push(data.result.data[0].data[list].value);
          });
		  const currentSeries: SeriesType = {
            type: "line",
            name: prefname,
            data: currentValues,
          };
          //該当する要素があった(checkbuttonが外れた)場合は現在のSetseriesから該当する要素を抜いたリストを、なかった場合は要素を付け加えたリストをセットする
		  setSeriesList([...SeriesList, currentSeries])
        });
    } else {
	  const copySeriesList: SeriesType[] = SeriesList.slice();
	  const tempSeriesList: SeriesType[] = copySeriesList.filter(series => series.name !== prefname);
	  console.log(tempSeriesList);
      setSeriesList(tempSeriesList);
    //   setSeriesList(SeriesList.filter((list) => list.name !== prefname));
	//   console.log(SeriesList);
    }
  };

   useEffect(() => {
    //apiで都道府県名と都道府県コードを受け取りstateのPrefsに格納しています
    fetch("https://opendata.resas-portal.go.jp/api/v1/prefectures", {
      headers: {
        "x-api-key": "5z07nougGOxYPvf26JK69uVftaVNc00AuZPmbnN9",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setPrefs(data.result);
      });
	console.log("after", SeriesList);
  }, [SeriesList])


  return (
    <>
      <div className="GetPrefList">
        <div className="Prefboxlist">
          {Prefs.map((data: PrefValue) => (
            <div className="Singleset" key={data.prefCode}>
              <input
                type="checkbox"
                onClick={() => handleClick(data.prefCode, data.prefName)}
              />
              <div className="Prefname">{data.prefName}</div>
            </div>
          ))}
        </div>
      </div>
	  <Graph
	  	List={SeriesList}
	  />

    </>
  );
};

export default GetPrefsList;
