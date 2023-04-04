

function Header({content}){
      return(
        <html>
<head>  
<title>TuneBot</title>
    <link rel="stylesheet" href="Header.css"/>
    <link rel="icon" href="img/TuneBotPink.png" type="image/x-icon"/>
    <link rel="shortcut icon" href="img/TuneBotPink.png" type="image/x-icon"/>
</head>
<body>
    <div id="logo-holder">
        <img src="img/TuneBotPink.png" alt="TuneBotPink" class="sway"/>
    </div>
    <div class="text-box">
        <span>T</span>
        <span>U</span>
        <span>N</span>
        <span>E</span>
        <span>B</span>
        <span>O</span>
        <span>T</span>
    </div>
</body>
</html>
      )

}
export default Header;