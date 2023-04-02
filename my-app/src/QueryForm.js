import React, {useState} from 'react';
import './QueryForm.css';

function QueryForm({setContent}){

  const [inputVal, setInput] = useState("");

  const placeholders = [
          "Write me a Rock song in the style of Taylor Swift",
          "Please give me a Rap song in the style of Mac Miller",
          "Write a Beatles song for me in the Pop genre pretty please",
          "Give me a song in the style of Prince"
        ]
  const placeholderStr = placeholders[Math.floor(Math.random() * placeholders.length)];

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Query Form got this value in HandleSubmit(): " + inputVal);
    if(inputVal == ""){
      alert("Prompt cannot be blank");
    }else{
      fetchData();
    }
  };

  const fetchData = async () => {
    try {
        const data = await (await fetch(`/query`)).json()
        console.log("got data")
        console.log(data)
        setContent(data)
    } catch (err) {
        console.log(err.message)
    }
}


  //  useEffect(() => {
  //       fetch('/query')
  //         .then(results => console.log(results))
  //         .then(data => {
  //           console.log("came back with a response")
  //           console.log(data)
  //         });
  //     }, []);


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