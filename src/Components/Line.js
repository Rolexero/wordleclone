import React from "react";

const Line = ({ guess, isFinal, data }) => {
  let tiles = [];
  let wordsLength = 5;
  let className = "tile";
  console.log(data, guess)
  for (let i = 0; i < wordsLength; i++) {
    const element = guess[i];
    if (isFinal) {
      if (element === data[i]) {
        className += " correct";
      } else if (data.includes(element)) {
        className += " close";
      } else {
        className += " incorrect";
      }
    }

    tiles.push(
      <div key={i} className={className}>
        {element}
      </div>
    );
  }
  return <div className="line">{tiles}</div>;
};

export default Line;
