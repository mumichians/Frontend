import React, {useState} from 'react';
import QueryForm from './QueryForm';
import Container from './Container'

function App(){
  const [query, setQuery] = useState("")
  return(
    <div>
      <QueryForm onQuery={setQuery}/>
      <Container query={query}/>
    </div>
  );
}

export default App;