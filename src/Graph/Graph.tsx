import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import "../App.css";

//stateの型をHighcharts.SeriesOptionsTypeにするとdataプロパティが型にが存在しないと言われるので
//一度自作のオブジェクト型(SeriesType)を挟んでいます。
interface SeriesType {
  type: string;
  name: string;
  data: number[];
}

interface SeriesTypeProps {
  List: SeriesType[];
}

const Graph = (props: SeriesTypeProps) => {

  //stateのデータをコピーしたのものをHighcharts.SeriesOptionsType型の変数に入れ直します
  //stateをそのまま下のoptionsに入れるとHighChartsがstateのデータを壊すような挙動を確認したのでこの処理を入れました
  const copyseries: Highcharts.SeriesOptionsType[] = [];
  props.List.forEach((list) => {
    copyseries.push({
      type: "line",
      name: list.name,
      data: [...list.data],
    });
  });

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
      props.List.length === 0
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
        : copyseries,
  };
  return (
    <div className="GraphArea">
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default Graph;
