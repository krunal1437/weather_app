import React from 'react';
import Titles from './components/Title';
import Form from './components/Form';
import Weather from './components/Weather';

const API_KEY = "9f54095975d8bed0ebc2a9cb10acdfe8";

class App extends React.Component {
  state = {
    data: "",
    error: ""  
  }

  getWeather = (e) => {
    e.preventDefault();
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      if(city && country){
        this.setState({ data: data});
      }
      else
      this.setState({ error: "Enter correct city and country."});
    })
    .catch(error => console.error('Error:', error));
  }

  render() {
    return(
      <div>
         <Titles/> 
         <Form getWeather={this.getWeather}/>
         {this.state.data !== "" && 
          <Weather 
              temperature={this.state.data.main.temp}
              city={this.state.data.name}
              country={this.state.data.sys.country}
              humidity={this.state.data.main.humidity}
              weather={this.state.data.weather}
              error={this.state.error}
          />}
      </div>
    );
  }  
}

export default App;