import { db } from './config';

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

    db.ref('/songs').push({
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
  latitude  = location.coords.latitude,
  longitude = location.coords.longitude

}

export const updateSongLike = (song_id) => {

}