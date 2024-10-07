let express = requiue('express');   // express로 열기
let app = express();                // express에서

app.listen(3000, function(){
    console.log("Hello, World!");
});