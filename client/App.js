import React, { Component } from 'react'
import { Button } from 'react-bootstrap'
import logo from './logo.svg'
import './App.css'

// import Link, { LinkedComponent } from 'valuelink'
// import { Input, TextArea, Select, Radio, Checkbox } from 'valuelink/lib/tags'


// import Select from 'react-select'
// import 'react-select/dist/react-select.css'

// import Multiselect from './components/Multiselect';
// import States from './components/States';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ['Hello'],
      options: [
        { value: 'one', label: 'One' },
        { value: 'two', label: 'Two' }
      ]
    };
  }

  onChange(text) {
    this.setState({text})
  }

  render() {
    // const links = this.linkAll();

    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>{this.state.text}</h2>
        </div>
        {/* <Select
          simpleValue
          name="form-field-name"
          value={this.state.text}
          options={this.state.options}
          onChange={this.onChange.bind(this)}
        /> */}
        {/* <Select valueLink={links.text}>
            <option value="one">one</option>
            <option value="two">two</option>
        </Select> */}
        {/* <States label="States" searchable />
    		<Multiselect label="Multiselect" /> */}
      </div>
    )
  }
}

export default App
