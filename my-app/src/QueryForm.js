import React, {useState} from 'react';
import './QueryForm.css';

function QueryForm({setContent}){

  const [inputVal, setInput] = useState("");

  // Generates placeholder text
  const placeholders = [
          "Write me a Rock song in the style of Taylor Swift",
          "Please give me a Rap song in the style of Mac Miller",
          "Write a Beatles song for me in the Pop genre pretty please",
          "Give me a song in the style of Prince"
        ]
  const placeholderStr = placeholders[Math.floor(Math.random() * placeholders.length)];
  
  // Handles press of generate button
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Query Form got this value in HandleSubmit(): " + inputVal);
    if(inputVal === ""){
      alert("Prompt cannot be blank");
    }else{
      fetchData();
    }
  };

 // Makes the api call to the backend
  const fetchData = async () => {
    try {
        const url = "http://localhost:8000/query/";
        const prompt = {'query': inputVal}
        const data = await (await fetch(url, {
          method: "POST",
          headers: {
                "Content-Type": "application/json",
              },
          body: JSON.stringify(prompt),
        })).json()
        console.log("got data")
        console.log(data)
        setContent(data)
    } catch (err) {
        console.log(err.message)
    }
}

  // Handles edits of query text box
  const handleChange = (event) => {
    console.log("Query Form got this value in handleChange(): " + event.target.value);
    setInput(event.target.value);
  };

  return(
    <div className="QueryForm">
      <form onSubmit={handleSubmit}>
      <input type="text" id='search' value={inputVal} placeholder={placeholderStr} onChange={handleChange}/>
      <input type="submit" id='submit-btn'/>
      </form>
    </div>
  )

}
export default QueryForm;