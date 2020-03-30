import React from "react";
import "../styles/FindCity.css";

const FindCity = props => {
  const options = Object.keys(props.sortableOptions).map(key => {
    return <option value={key}>{props.sortableOptions[key].title}</option>;
  });

  return (
    <div>
      <div className="find-city">
        <input
          type="text"
          name="city"
          placeholder="nazwa miasta"
          onChange={props.setActualSearch}
          value={props.actualSearch}
        />
      </div>
      <select onChange={props.changeSort}>{options}</select>
    </div>
  );
};

export default FindCity;
