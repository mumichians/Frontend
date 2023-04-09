import React, {useState} from 'react';
import QueryForm from './QueryForm';
import Container from './Container'
import Header from './Header'

function App(){
  const [content, setContent] = useState("")
  const [submitStatus, setSubmitStatus] = useState(false)
  return(
    <div id='app'>
      <Header/>
      <QueryForm setContent={setContent} setSubmitStatus={setSubmitStatus}/>
      <Container content={content} submitStatus={submitStatus}/>
    </div>
  );
}

export default App;