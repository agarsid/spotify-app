import { db } from '../../backend/config';

export let addSong = item => {
    db.ref('/songs').push({
      song: item
    });
  };

export let addLocation = item => {
    db.ref('/locations').push({
      location: item
    });
  };

// export let incSongLikes
