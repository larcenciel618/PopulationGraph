import React from "react";
type TitleType = {
  title: string;
};

const Title = (props: TitleType) => {
  return (
    <header className="Title">
      <p className="Titletext">{props.title}</p>
    </header>
  );
};

export default Title;
