import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });


// TODO: Add logic to a method that accepts some content and adds it to the database
// putDB is a function that takes a content parameter and returns a promise that creates a database using INDEXEDDB
export const putDb = async (content) => { 
  console.log('PUT to the database'); 
  const jateDb  = await openDB('jate', 1);
  const tx = jateDb.transaction('jate', 'readwrite'); 
  const store = tx.objectStore('jate');
  const request = store.put({ content: content });
  const result = await request;
  console.log('Data saved to the database', result);
  return result;
  // console.error('putDb not implemented');
}

// TODO: Add logic for a method that gets all the content from the database
// getDb is a function that returns a promise that gets all the content from the database using INDEXEDDB
export const getDb = async () => {
  console.log('GET from the database');
  const jateDb = await openDB('jate', 1);
  const tx = jateDb.transaction('jate', 'readonly');
  const store = tx.objectStore('jate');
  const request = store.getAll();
  const result = await request;
  console.log('Data saved to the database', result);
  return result?.value;
  // console.error('getDb not implemented');
}
initdb();
