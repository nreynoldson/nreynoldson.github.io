var NUM_ARTISTS = 10;

var apiKey = '3551f19d2bc349b94217547561ddb15c';
document.addEventListener('DOMContentLoaded', bindButtons);

function bindButtons(){
    document.getElementById('artistSubmit').addEventListener('click', function(event){
        var req = new XMLHttpRequest();
        var artist = document.getElementById('artist').value;
        artist = artist.replace(/\s/g, '');
    
                
        var requestURL = 'https://ws.audioscrobbler.com/2.0/?method=artist.getsimilar&artist=' + artist + '&api_key=' + apiKey + '&format=json';
                
        req.open('GET', requestURL, true);
        req.send(null);
         
        req.addEventListener('load', function(){
            var response = JSON.parse(req.responseText);
            
            var artistArray = [];
            var j = 0;
            for(var i = 0; i < NUM_ARTISTS; i++)
            {    
                let obj ={};
            
                do{
                obj.name = response.similarartists.artist[j].name;
                obj.mbid = response.similarartists.artist[j].mbid;
                   j++;
                 }while(obj.mbid === '');

            artistArray.push(obj);
            }
            
            
            for(let i = 0; i < artistArray.length; i++)
            {
             artistArray.topTags = callbackClosure(artistArray[i], i, getArtistTags(artistArray[i], i));
            } 
            

                let listTitle = document.getElementById("artistList");
            listTitle.textContent = "Artists Similar to " + response.similarartists["@attr"].artist;
            listTitle.appendChild(document.createElement('hr'));
                
            
            })    
        
        event.preventDefault();   
    })
          
}


function callbackClosure(i, callback){
    return function(){
        return callback(i);
    }
}


function getArtistTags(artist, i)
{ 

   var tagRequest = new XMLHttpRequest();
    
    var tagURL = 'https://ws.audioscrobbler.com/2.0/?method=artist.gettoptags&mbid=' + artist.mbid + '&api_key=' + apiKey + '&format=json';
    console.log(tagURL);

                
    tagRequest.open('GET', tagURL, true);
    tagRequest.send(null);
    
     tagRequest.addEventListener('load', function(){
        var tagResponse = JSON.parse(tagRequest.responseText);
         console.log(tagResponse);
 
         
        artist.topTags =[];
         
         
         let listArtist = document.createElement("li");
            document.getElementById("artistList").appendChild(listArtist);
         listArtist.textContent = artist.name;
         let genreList = document.createElement("ul");
         genreList.className = "subList";
         listArtist.appendChild(genreList);
         let genreBullet = document.createElement("li");
         genreBullet.className = "subBullet";
         genreList.appendChild(genreBullet);
         genreBullet.textContent = "Genres: "
         
         for(let i = 0; i < 3; i++)
         {   
            artist.topTags.push(tagResponse.toptags.tag[i].name);
        
             genreBullet.textContent += artist.topTags[i];
             
             if(i != 2)
              genreBullet.textContent += ', ';
             
         }


    }
)
}

   
