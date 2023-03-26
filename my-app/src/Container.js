import React, { useEffect, useState } from 'react';

function Container({query}){
    const {lyrics, setLyrics} = useState('');
    console.log("function container is being called")
    useEffect(() => {
        fetch('/profile')
          .then(results => results.json())
          .then(data => {
            console.log(data)
          });
      }, []);

      return(
        <div>{lyrics}</div>
      )

}
export default Container;
// const {lyricRes} = data.results;
//             setLyrics(lyricRes)