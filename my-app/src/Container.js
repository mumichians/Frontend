import React from 'react';
import './Container.css';
// import Typewriter from "typewriter-effect";

function Container({content, submitStatus}){
    console.log("function container is being called")
    console.log({content})

    // function copyToClipboard() {
    //      // Create a dummy input to copy the string array inside it
    //     var dummy = document.createElement("input");

    //     // Add it to the document
    //     document.body.appendChild(dummy);

    //     // Set its ID
    //     dummy.setAttribute("id", "dummy_id");

    //     // Output the array into it
    //     document.getElementById("dummy_id").value=checkbx;

    //     // Select it
    //     dummy.select();

    //     // Copy its contents
    //     document.execCommand("copy");

    //     // Remove it as its not needed anymore
    //     document.body.removeChild(dummy);
    // }

      if (submitStatus){
        if (content === ""){
          return(
          <div id="loading">
            <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
          </div>)
        }else{
        return(
          <div className="container">
            <div id="bar">
              <ul>
                <li>{content['parsed_artist']}</li>
                <li>{content['parsed_genre']}</li>
                <li>{content['parsed_subject']}</li>
              </ul>
              {/* <button onclick="copyToClipboard()">Copy Text</button>
              <button onclick="downloadText()">Download Text</button> */}
            </div>
            <div id="typing-text" className="lyrics">
              {/* <Typewriter
              onInit={(typewriter)=> {
              typewriter
              .changeDelay(1)
              .typeString(content['lyrics'][0])
              .start();
              }}/> */}
              {content['lyrics']}
            </div>
          </div>
        )}
      }else{
        return(<div></div>)
      }
      

}
export default Container;