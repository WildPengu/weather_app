import React from "react";
import WeatherOfCity from "./WeatherOfCity";
import FindCity from "./FindCity";
import "../styles/WeatherContainer.css";

const sortableOptions = {
  nameDescending: {
    title: "Sortuj alfabetycznie malejąco",
    sort: (prev, next) => prev.stacja.localeCompare(next.stacja)
  },
  nameAscending: {
    title: "Sortuj alfabetycznie rosnąco",
    sort: (prev, next) => next.stacja.localeCompare(prev.stacja)
  },
  temperatureDescending: {
    title: "Sortuj temperature malejąco",
    sort: (prev, next) =>
      parseFloat(next.temperatura) - parseFloat(prev.temperatura)
  },
  temperatureAscending: {
    title: "Sortuj temperature rosnąco",
    sort: (prev, next) =>
      parseFloat(prev.temperatura) - parseFloat(next.temperatura)
  }
};

class WeatherContainer extends React.Component {
  state = {
    actualSearch: "",
    data: [],
    currentSort: "nameDescending"
  };

  componentDidMount() {
    fetch("https://danepubliczne.imgw.pl/api/data/synop")
      .then(response => response.json())
      .then(data => this.setState({ data }));
  }

  setActualSearch = e => {
    this.setState({
      actualSearch: e.target.value.toLowerCase()
    });
  };

  filterCities = cities => {
    let filteredCities = cities.filter(city => {
      return city.stacja.toLowerCase().indexOf(this.state.actualSearch) !== -1;
    });
    return filteredCities;
  };

  changeSort = e => {
    this.setState({
      currentSort: e.target.value
    });
  };

  render() {
    const cities = this.filterCities(this.state.data)
      .sort(sortableOptions[this.state.currentSort].sort)
      .map(city => (
        <WeatherOfCity
          key={city.id_stacji}
          cityName={city.stacja}
          temp={city.temperatura}
          pressure={city.cisnienie}
        />
      ));
    return (
      <div>
        <div>
          <FindCity
            actualSearch={this.state.actualSearch}
            setActualSearch={this.setActualSearch}
            changeSort={this.changeSort}
            sortableOptions={sortableOptions}
          />
        </div>
        <div className="weather-container">{cities}</div>
      </div>
    );
  }
}

export default WeatherContainer;
