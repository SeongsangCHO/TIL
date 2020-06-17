import React , { Component } from 'react';
import './App.css';
import TOC from "./component/TOC";
import Content from "./component/Content";
import Subject from "./component/Subject";








class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      mode: 'welcome',
      subject:{title:'WEB2', sub:'WWW'},
      welcome:{title:'welcome', desc:'Hello desc'},
      contents:[
        {id:1, title:'HTML!', desc:'HTML is HYPERTEXT'},
        {id:2, title:'CSS!', desc:'CSS for design'},
        {id:3, title:'JS!', desc:'JS is fun.'}
      ]
    }
  }
  render(){
    var _title, _desc = null;
    if(this.state.mode === 'welcome'){
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
    }
    else if(this.state.mode === 'read'){
      _title = this.state.contents[0].title;
      _desc = this.state.contents[0].desc;
    }
    const style = {
      backgroundColor: 'black',
      padding: '16px',
      color: 'white',
      fontSize: 5 + 10 + 'px'
    }
    return (
      <div className="App">
        {/* 주석 사용방법 */}
        <Subject title={this.state.subject.title}
         sub={this.state.subject.sub}></Subject>
        <Subject title="React" sub="For UI"></Subject>
        <TOC data={this.state.contents}></TOC>
        <Content title={_title} desc={_desc}></Content>

        {
          1 + 1 === 2
            ? (<div style={style}>3항연산자 조건이 맞아요</div>)
            : (<div>3항연산자 조건이 틀려요</div>)
        }
        {
          1 + 1 === 2 && <div>AND연산자 맞아요!</div>
        }
      </div>
    );
  }
}


export default App;
