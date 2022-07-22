import React from 'react';
// import { defaultMaxListeners } from "events";
import "../App.css";
import Title from "./Title";
import Explain from "./Explain";

type HeadlineType = {
  title: string;
};

const Headline = (props: HeadlineType) => {
  return (
    <>
      <Title title={props.title} />
      <Explain />
    </>
  );
};

export default Headline;
