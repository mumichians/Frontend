import React from 'react';
import './QueryForm.css';

class QueryForm extends React.Component {
  constructor(props) {
    super(props);
    let placeholders = [
      "Write me a Rock song in the style of Taylor Swift",
      "Please give me a Rap song in the style of Mac Miller",
      "Write a Beatles song for me in the Pop genre pretty please",
      "Give me a song in the style of Prince"
    ]
    let placeholderStr = placeholders[Math.floor(Math.random() * placeholders.length)];
    this.state = {value: '', placeholder: placeholderStr };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('A query was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
    <div className="QueryForm">
      <form onSubmit={this.handleSubmit}>
        <label>
          Query:
          <input type="text" value={this.state.value}  placeholder={this.state.placeholder} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
      </div>
    );
  }
}
export default QueryForm;