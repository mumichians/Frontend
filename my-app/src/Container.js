import React from 'react';
import './Container.css';
import Typewriter from "typewriter-effect";

function Container({content, submitStatus}){
    console.log("function container is being called")
    console.log({content})

    // var text = "I'm chicken fried\nToo cool for school\n[Chorus: Cool]\nJames was here"; // Replace with the text you want to output
    
  
    // function typeWriter() {
    //     let delay = 50; // Replace with the delay between each letter (in milliseconds)
    //     let i = 0
    //     if (i < text.length) {
    //         if (text.charAt(i) === '[') { // Check for opening bracket
    //         i++;
    //         var closeBracketIndex = text.indexOf(']', i); // Find index of closing bracket
    //         var boldedText = text.slice(i, closeBracketIndex); // Extract text between brackets
    //         document.getElementById("typing-text").innerHTML += '<strong>['; // Add opening bracket with <strong> tag
    //         typeBoldedText(boldedText, function() { // Call function to type out bolded text
    //             document.getElementById("typing-text").innerHTML += '<strong>' + '] </strong>'; // Add closing bracket with </strong> tag
    //             i = closeBracketIndex + 1; // Update index to skip over closing bracket
    //             setTimeout(typeWriter, delay); // Call typeWriter function recursively with delay
    //         });
    //         } else if (text.charAt(i) === '\n') { // Check for newline character
    //         document.getElementById("typing-text").innerHTML += '<br>'; // Add <br> tag
    //         i++;
    //         setTimeout(typeWriter, delay); // Call typeWriter function recursively with delay
    //         } else {
    //         document.getElementById("typing-text").innerHTML += text.charAt(i); // Add regular character
    //         i++;
    //         setTimeout(typeWriter, delay); // Call typeWriter function recursively with delay
    //         }
    //     }
    // }

    // function typeBoldedText(text, callback) {
    //     let j = 0;
    //     let boldDelay = 50; // Delay between each bolded character (in milliseconds)
    //     function typeChar() {
    //         if (j < text.length) {
    //         document.getElementById("typing-text").innerHTML += '<strong>' + text.charAt(j) + '</strong>';
    //         j++;
    //         setTimeout(typeChar, boldDelay); // Call typeChar function recursively with delay
    //         } else {
    //         callback();
    //         }
    //     }
    //     typeChar();
    // }

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

    // function downloadText() {
    //     var element = document.createElement("a");
    //     element.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(text));
    //     element.setAttribute("download", "tunebot.txt");
    //     element.style.display = "none";
    //     document.body.appendChild(element);
    //     element.click();
    //     document.body.removeChild(element);
    // }
      if (submitStatus){
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
              .typeString(content['lyrics'][0])
              .start();
              }}/> */}
              {content['lyrics']}
            </div>
          </div>
        )
      }else{
        return(<div></div>)
      }
      

}
export default Container;