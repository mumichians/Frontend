import React, {useState} from 'react';
import QueryForm from './QueryForm';
import Container from './Container'
import Header from './Header'
import './App.css';

function App(){
  const [content, setContent] = useState("")
  return(
    <div id='app'>
      <Header/>
      <QueryForm setContent={setContent}/>
      <Container content={content}/>
    </div>
  );
}

export default App;