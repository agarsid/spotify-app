import { db } from './config';

export let songs = db.ref('/songs');
export let locations = db.ref('/locations');


// itemsRef.on('value', snapshot => {
//     let data = snapshot.val();
//     let items = Object.values(data);
//     this.setState({ items });
//   });