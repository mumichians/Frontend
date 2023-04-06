import React from 'react';
import './Container.css';

function Container({content}){
    console.log("function container is being called")
    console.log({content})
      return(
        <div className="container">
          <div id="bar">
            <ul>
              <li>{content['parsed_artist']}</li>
              <li>{content['parsed_genre']}</li>
              <li>{content['parsed_subject']}</li>
            </ul>
          </div>
          <div className="lyrics">
            {content['lyrics']}
          </div>
        </div>
      )

}
export default Container;