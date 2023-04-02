import React, {useState} from 'react';
import QueryForm from './QueryForm';
import Container from './Container'

function App(){
  const [content, setContent] = useState("")
  return(
    <div>
      <QueryForm setContent={setContent}/>
      <Container content={content}/>
    </div>
  );
}

export default App;