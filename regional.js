var apiKey = '3551f19d2bc349b94217547561ddb15c';
document.addEventListener('DOMContentLoaded', bindButtons);


function bindButtons(){
    document.getElementById('regionSubmit').addEventListener('click', function(event){
        
        var req = new XMLHttpRequest();
        var location = document.getElementById('region').value;
       
        if(location != ""){
            var requestURL = 'https://ws.audioscrobbler.com/2.0/?method=geo.gettopartists&country=' + location + '&api_key=' + apiKey + '&format=json';
                
            req.open('GET', requestURL, true);
            req.send(null);
         
            req.addEventListener('load', function(){
                var response = JSON.parse(req.responseText);
                
                
            let listTitle = document.getElementById("regionList");
            listTitle.textContent = "Showing Top Artists for " + response.topartists["@attr"].country;
            listTitle.appendChild(document.createElement('hr'));
                
                
                var top10 = [];
                for(var i = 0; i < 10; i++){
                    top10.push(response.topartists.artist[i]);
                    console.log(top10);
                let regionArtist = document.createElement("li");
                    document.getElementById("regionList").appendChild(regionArtist);
                    regionArtist.textContent = top10[i].name;
                    
                    let listeners = document.createElement("ul");
                   listeners.className = "subList";
                    regionArtist.appendChild(listeners);
                    let bullet = document.createElement("li");
                    bullet.className = "subBullet";
                    listeners.appendChild(bullet);
                     bullet.textContent = "Listeners: " + parseInt(top10[i].listeners).toLocaleString();
                }
                
                
                })    
        
            event.preventDefault();  
        }
    })
          
}
