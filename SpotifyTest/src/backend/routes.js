import { db } from './config';
import {songs} from './models';
import {distanceBetweenLocations} from '../utils/distance'

export const addSong = (item,location) => {

  try{
    console.log(item.item.artists.map(artist => (artist.name)));
    var song = {
      song_id: item.item.id,
      name: item.item.name,
      albumImg: item.item.album.images[0].url,
      artist: item.item.artists.map(artist => (artist.name)),
      timestamp: item.timestamp,
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      likes: 1
    }

    songs.push({
      song: song
    });
    return {msg: 'Success'};
  }
  catch(e){
    console.error(e);
    return {msg: 'Error'};
  }
};


export const getSongs = (location) => {

  return new Promise((resolve,reject) => {
    result = {}
  
    loc1 = {latitude: location.coords.latitude, longitude: location.coords.longitude}
    
    response =[]
  
    songs.on("value", async function(snapshot) {
      result = await snapshot.val();
      Object.keys(result).forEach(function(key) {
  
        loc2 = {latitude: result[key].song.latitude, longitude: result[key].song.longitude}
        console.log(distanceBetweenLocations(loc1,loc2));
        if(distanceBetweenLocations(loc1,loc2) >= 0){
          result[key].database_id = key
          response.push(result[key])
        }
      
      });
      // console.log(response)
      resolve(response);
      
      // console.log(arrayOfObj)
  
    }, function (errorObject) {
      console.log("The read failed: " + errorObject.code);
      reject(errorObject.code)
    });
  
  })
  
  

}

export const updateSongLike = (song_id) => {

  let song = db.ref('/songs/'+song_id);
  result=null
  song.once("value", function(snapshot) {

      result = snapshot.val();
      song.child('song').update({'likes': result.song.likes + 1});
      return({res: 'Success'})
  },
  function (errorObject) {
      console.log("The read failed: " + errorObject.code);
      return({res:"The read failed: " + errorObject.code})
  });
  
}

