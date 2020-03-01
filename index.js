var NUM_ARTISTS = 20;

var apiKey = '3551f19d2bc349b94217547561ddb15c';
document.addEventListener('DOMContentLoaded', genPictures);
var slides = document.getElementsByClassName("carousel-item");
        
function genPictures(){
    var req = new XMLHttpRequest();
                
    var topArtistURL = 'https://ws.audioscrobbler.com/2.0/?method=chart.gettopartists&api_key=' + apiKey + '&format=json';
                
    req.open('GET', topArtistURL, true);
    req.send(null);
                
    req.addEventListener('load', function(){
        var response = JSON.parse(req.responseText);
        console.log(response);
        var artistArray = [];
        let j = 0;
        for(let i = 0; i < NUM_ARTISTS; i++)
        {
            let obj ={};
            
            do{
            obj.name = response.artists.artist[j].name;
            obj.mbid = response.artists.artist[j].mbid;
                j++;
            }while(obj.mbid === '');

            artistArray.push(obj);
        }
        console.log(artistArray);
        
        for(let i = 0; i < artistArray.length; i++)
        {
            artistArray[i].topAlbumArt = callbackClosure(artistArray[i], i, getTopAlbumArt(artistArray[i], i));
        } 
        
        
    })
                
    event.preventDefault();
        
}


function callbackClosure(i, callback){
    return function(){
        return callback(i);
    }
}

function getTopAlbumArt(albumArtist, i)
{ 

   let albumRequest = new XMLHttpRequest();
    console.log(albumArtist);
    
    let albumURL = 'https://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&mbid=' + albumArtist.mbid + '&api_key=' + apiKey + '&format=json';
    
    console.log(albumURL);
                
    albumRequest.open('GET', albumURL, true);
    albumRequest.send(null);
    
     albumRequest.addEventListener('load', function(){
        let albumResponse = JSON.parse(albumRequest.responseText);
         console.log(albumResponse);
   
         

   albumArtist.topAlbumArt = albumResponse.topalbums.album[0].image[3]['#text'];
        
    
        let carouselWrapper = document.createElement("div");
        if(document.getElementsByClassName("carousel-item").length === 0)
            carouselWrapper.className ="carousel-item active";
         else
             carouselWrapper.className ="carousel-item";
         
       let start =  document.getElementById("carouselStart");
         start.appendChild(carouselWrapper);
         
        let image = document.createElement("img");
        image.className = "d-block w-100";
            image.setAttribute('src', albumArtist.topAlbumArt);
            carouselWrapper.appendChild(image);

    }
)
}

