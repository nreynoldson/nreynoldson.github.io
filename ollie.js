document.addEventListener('DOMContentLoaded', ollieButton);
document.addEventListener('DOMContentLoaded', function(){
        let random = Math.floor(Math.random() * (26 - 1 + 1)) + 1; 
        let ollieSrc = "images/randomOllie/Ollie_" + random + ".jpg";
        
       document.getElementById("randomOllie").href = ollieSrc;
});


function ollieButton(){
    document.getElementById('randomOllie').addEventListener('click', function(event){
   
    let random = Math.floor(Math.random() * (26 - 1 + 1)) + 1; 
       let ollieSrc = "images/randomOllie/Ollie_" + random + ".jpg";
        
       document.getElementById("randomOllie").href = ollieSrc;

}
            
                                                            
            
            )    
        
 
    }
          
