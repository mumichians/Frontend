import React, {useState} from 'react';
import QueryForm from './QueryForm';
import Container from './Container'
import Header from './Header'

function App(){
  const [content, setContent] = useState("")
  return(
    <div>
      <Header/>
      <QueryForm setContent={setContent}/>
      <Container content={content}/>
    </div>
  );
}

export default App;