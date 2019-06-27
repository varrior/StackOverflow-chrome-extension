/*global chrome*/
import React from 'react';
import './App.css';
import {IoIosSearch} from 'react-icons/io';

class App extends React.Component {
  constructor(){
    super();
    this.sendRequest = this.sendRequest.bind(this);
    this.state = {
      items: [],
      found: false,
      emptyMsg: false,
    }
  }
  sendRequest(e){
    e.preventDefault();
    const data = e.target.children[0].value;
    if(data.length === 0){
        this.setState({
          emptyMsg: 'Search input can not be empty, please add some text'
        })
    } else {
      chrome.runtime.sendMessage({data: data}, function({res}){
        let filterRes = res.items.filter(item=>item.is_answered)
        this.setState({
          items: filterRes,
          found: true,
          emptyMsg: false,
        })
      }.bind(this))      
    }

  }
  render(){
    return (
      <div className="App">
        <div className="sidebar-stack">
            <div className="search-input">
              <form className="sendRequest" onSubmit={this.sendRequest}>
                <input type="text" placeholder="Search..."></input>
                <IoIosSearch className="search-icon"/>
                <button className="submit">Search</button>                
              </form>
            </div>
            <div className="results">
              {this.state.emptyMsg && <h3 className="start-search red">{this.state.emptyMsg}</h3>}
              {(!this.state.found && this.state.items.length === 0 && !this.state.emptyMsg) && <h3 className="start-search">Search the question on StactOverflow.com</h3>} 
              {((this.state.items.length > 0) && this.state.found && !this.state.emptyMsg) && <h3>{this.state.items.length} questions</h3>} 
              {((this.state.items.length === 0) && this.state.found && !this.state.emptyMsg) && <h3 className="start-search">No questions found</h3>} 
              <ul>
                {this.state.items.filter(item=>item.is_answered).map((item) => {
                  return (
                    <li key={item.accepted_answer_id}>
                      <div className="inline-table">
                        <div className="votes">
                          <span>{item.score}</span>
                          <span>votes</span>
                        </div>
                        <div className="answers">
                          <span>{item.answer_count}</span>                                    
                          <span>answers</span>
                        </div>
                        <div className="views">
                          <span>{item.view_count}</span>                                    
                          <span>views</span>
                        </div>
                        <div className="title-section">
                          <a href={item.link} target="_blank">{item.title}</a> 
                          <div className="tags">{item.tags.map(item=>{
                              return (<span> {item}</span>)
                          })}
                          </div>
                        </div>            
                      </div>
                    </li>
                  )
                })}
              </ul>
            </div>
        </div>
    </div>
    );    
  }
}

export default App;
