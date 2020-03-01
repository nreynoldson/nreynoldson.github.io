var NUM_ARTISTS = 10; 
var apiKey = '3551f19d2bc349b94217547561ddb15c';
document.addEventListener('DOMContentLoaded', bindButtons);


function bindButtons(){
    document.getElementById('regionSubmit').addEventListener('click', function(event){
        
        var req = new XMLHttpRequest();
        var location = document.getElementById('region').value;
       
        if(location.toLowerCase() == 'usa' || location.toLowerCase() == 'us' || location.toLowerCase() == 'america')
            location = 'united states';
        
        var requestURL = 'https://ws.audioscrobbler.com/2.0/?method=geo.gettopartists&country=' + location + '&api_key=' + apiKey + '&format=json';
                
        req.open('GET', requestURL, true);
        req.send(null);
         
        req.addEventListener('load', function(){
        var response = JSON.parse(req.responseText);
                
                
        let listTitle = document.getElementById("regionList");
        listTitle.textContent = "Showing Top Artists for " + response.topartists["@attr"].country;
        listTitle.appendChild(document.createElement('hr'));
                
                
        var artistArray = [];
        for(var i = 0; i < 10; i++){
            artistArray.push(response.topartists.artist[i]);
                    
            let regionArtist = document.createElement("li");
            document.getElementById("regionList").appendChild(regionArtist);
            regionArtist.textContent = artistArray[i].name;
                    
            let listeners = document.createElement("ul");
            listeners.className = "subList";
            regionArtist.appendChild(listeners);
            let bullet = document.createElement("li");
            bullet.className = "subBullet";
            listeners.appendChild(bullet);
            bullet.textContent = "Listeners: " + parseInt(artistArray[i].listeners).toLocaleString();
        }
                
                
    })    
        
    event.preventDefault();  

})
          
}
