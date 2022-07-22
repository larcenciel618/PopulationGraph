import React, { useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
// import { setUncaughtExceptionCaptureCallback } from "process";

interface PrefValue {
  prefCode: number;
  prefName: string;
}

const GetPrefsList = () => {
  const [Prefs, setPrefs] = useState([]);
  const [SeriesList, setSeriesList] = useState<Highcharts.SeriesOptionsType[]>(
    []
  );
  const [isDrew, reverseIsDrew] = useState(true);

  const handleClick = (index: number, prefname: string) => {
    //SeriesList内nameを全て検索し、該当する要素があった場合は、isExistedにtrueをたてる
	let currentSeries: Highcharts.SeriesOptionsType;
    let isExisted = false;
    SeriesList.forEach((type: Highcharts.SeriesOptionsType) => {
      if (type.name === prefname) {
        isExisted = true;
      }
    });

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
		  console.log(currentValues);
          currentSeries= {
            type: "line",
            name: prefname,
            data: currentValues,
          };
          //該当する要素があった(checkbuttonが外れた)場合は現在のSetseriesから該当する要素を抜いたリストを、なかった場合は要素を付け加えたリストをセットする
		  setSeriesList([...SeriesList, currentSeries])
        })
		.then(() => {
	  		console.log(SeriesList);
		})
    } else {
      setSeriesList(SeriesList.filter((list) => list.name !== prefname));
	  console.log(SeriesList);
    }
  };

  if (isDrew === true) {
    //apiで都道府県名と都道府県コードを受け取りstateのPrefsに格納しています
    fetch("https://opendata.resas-portal.go.jp/api/v1/prefectures", {
      headers: {
        "x-api-key": "5z07nougGOxYPvf26JK69uVftaVNc00AuZPmbnN9",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setPrefs(data.result);
        reverseIsDrew(false);
      });
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
      categories: [
        "1960",
        "1965",
        "1970",
        "1975",
        "1980",
        "1985",
        "1990",
        "1995",
        "2000",
        "2005",
        "2010",
        "2015",
        "2020",
        "2025",
        "2030",
        "2035",
        "2040",
        "2045",
      ],
    },
    yAxis: {
      title: {
        text: "人口",
      },
    },
    plotOptions: {
      series: {
        label: {
          connectorAllowed: false,
        },
      },
    },
    series:
      SeriesList.length === 0
        ? [
            {
              type: "line",
              name: "都道府県名",
              data: [
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
              ],
            },
          ]
        : SeriesList,
  };
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
      <div className="GraphArea">
        <HighchartsReact highcharts={Highcharts} options={options} />
      </div>
    </>
  );
};

export default GetPrefsList;
