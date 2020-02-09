import React, { Component } from 'react';
import { render } from "react-dom";
import { Spring } from 'react-spring/renderprops';
import Collapsible from 'react-collapsible';

// --------Components--------

import Goo from './Goo';
import Tabs from './Tabs';

// --------------------------

require('./index.scss');

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
    }
  }

  componentDidMount() {
    fetch('http://localhost:3002/bills/')
      .then(res => res.json())
      .then(json => {
        this.setState({
          items: json,
        })
      });
  }

  render() {

    const {items} = this.state;
    const bills = items.filter(item => item.isBill === true)
    const transactions = items.filter(item => item.isBill === false)

    return (
      <Spring
        from={{opacity: 0}}
        to={{opacity: 1}}
        config={{duration: 2000}}
      >
        {props => (
          <div style={props}>
            <div className="big-container">
              <div className="navbar">
                <svg xmlns="http://www.w3.org/2000/svg" width="63.44" height="22.398" viewBox="0 0 63.44 22.398" fill="currentColor">
                  <g>
                    <path d="M8.027,25.519A7.881,7.881,0,0,1,0,17.427,7.827,7.827,0,0,1,8.027,9.4c3.884,0,6.927,2.33,7.639,5.826h-3.69a3.986,3.986,0,0,0-3.949-2.589,4.623,4.623,0,0,0-3.172,1.23A4.894,4.894,0,0,0,3.56,17.492a5.283,5.283,0,0,0,1.295,3.625,4.1,4.1,0,0,0,3.107,1.23,3.9,3.9,0,0,0,3.949-2.654H15.6C14.889,23.706,11.264,25.519,8.027,25.519Z" transform="translate(0 -3.315)"></path>
                    <rect width="3.496" height="21.815" transform="translate(17.867)"></rect>
                    <path d="M44.857,25.519A7.75,7.75,0,0,1,36.7,17.492,7.806,7.806,0,0,1,44.727,9.4a7.609,7.609,0,0,1,5.761,2.4A8.679,8.679,0,0,1,52.625,18.2H40.26l.065.388a4.323,4.323,0,0,0,4.467,4.143,4.124,4.124,0,0,0,3.755-2.007h3.69A7.41,7.41,0,0,1,44.857,25.519Zm-.129-13.335a4.224,4.224,0,0,0-4.208,3.172l-.129.388h8.545l-.129-.388A4.03,4.03,0,0,0,44.727,12.184Z" transform="translate(-12.943 -3.315)"></path>
                    <path d="M71.827,25.519A7.827,7.827,0,0,1,63.8,17.492a8.027,8.027,0,1,1,16.054-.065A7.92,7.92,0,0,1,71.827,25.519Zm0-12.817a4.461,4.461,0,0,0-4.467,4.726,4.474,4.474,0,1,0,8.933,0A4.461,4.461,0,0,0,71.827,12.7Z" transform="translate(-22.5 -3.315)"></path>
                  </g>
                  <circle cx="2.071" cy="2.071" r="2.071" transform="translate(59.297 18.255)"></circle>
                </svg>
              </div>
              <Goo />
              <div className="container">
                <div className="small-container">
                  <Tabs>
                    <div label="Bills">
                      <ul className="list">
                        {bills.map(item => (
                          <Collapsible trigger={item.name + " " + item.transactions.length} transitionTime='130'>
                            <li className="list-item" key={item.id}>
                              {item.transactions.map(a => (
                                <li className="list-item" key={a.id}>£{a.amount} | {a.date}</li>
                              ))}
                            </li>
                          </Collapsible>
                        ))}
                      </ul>
                    </div>
                    <div label="Transactions">
                      <ul className="list">
                        {transactions.map(item => (
                          <Collapsible trigger={item.name + " " + item.transactions.length} transitionTime='130'>
                            <li className="list-item" key={item.id}>
                              {item.transactions.map(a => (
                                <li className="list-item" key={a.id}>£{a.amount} | {a.date}</li>
                              ))}
                            </li>
                          </Collapsible>
                        ))}
                      </ul>
                    </div>
                  </Tabs>
                </div>
              </div>
            </div>
          </div>
        )}
      </Spring>
    );
  }
}

export default App;
