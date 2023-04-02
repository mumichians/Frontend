import React, { useEffect, useState } from 'react';

function Container({content}){
    console.log("function container is being called")
    console.log({content})
      return(
        <div className="container">
          <div>
            <ul>
              <li>{content['parsed_artist']}</li>
              <li>{content['parsed_genre']}</li>
              <li>{content['parsed_subject']}</li>
            </ul>
          </div>
          <div className="lyrics">
          {content['test']}
          </div>
        </div>
      )

}
export default Container;
// const {lyricRes} = data.results;
//             setLyrics(lyricRes)