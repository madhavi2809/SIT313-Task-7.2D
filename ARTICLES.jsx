import React, { useEffect, useState } from 'react';
import { db, storage } from './firebase';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 } from 'uuid';

function ARTICLES() {
  const [imageUpload, setImageUpload] = useState(null);
  const [newTitle, setnewTitle] = useState('');
  const [newAbstract, setNewAbs] = useState('');
  const [Art_text, setArt_Text] = useState('');
  const [setTags, setNewTags] = useState('');
  const [users, setUsers] = useState([]);
  const usersCollectionRef = collection(db, 'Article');

  const uploadImage = () => {
    if (imageUpload == null) return;

    const ImageRef = ref(storage, `images/${imageUpload.name + v4()}`);
    uploadBytes(ImageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((downloadURL) => {
        const imageUrl = downloadURL;

        const articleData = {
          Title: newTitle,
          Abstract: newAbstract,
          ArticleText: Art_text,
          Tags: setTags,
          ImageUrl: imageUrl,
        };

        addDoc(usersCollectionRef, articleData)
          .then(() => {
            alert('Article and image uploaded successfully');
          })
          .catch((error) => {
            console.error('Error adding document: ', error);
          });
      });
    });
  };

  const createUser = async () => {
    await addDoc(usersCollectionRef, {
      Title: newTitle,
      Abstract: newAbstract,
      ArticleText: Art_text,
      Tags: setTags,

    });
  };

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getUsers();
  }, []);

  return (
    <>
      <div className='what'>
        <h2 className="h2">WHAT DO YOU WANT TO ASK AND SHARE</h2>
      </div>
      <div className="all">
        <div className="q">Title:</div> <input className="title" placeholder="Enter a descriptive title" onChange={(event) => {
          setnewTitle(event.target.value)
        }} />

        <div className='q'>
          Add an Image: <input className="browse" type="file" onChange={(event) => {
            setImageUpload(event.target.files[0])
          }} />
        </div>

        <div>
          <button className="upload" onClick={uploadImage}>Upload</button>
        </div>

        <div className="q">Abstract:</div>
        <textarea className="abstract" placeholder="Enter a 1-paragraph abstract" onChange={(event) => {
          setNewAbs(event.target.value)
        }} />
        <div className="q">Article Text: </div> <textarea className="text" placeholder="Enter a 1-paragraph abstract" />
        <div className="q">Tags:</div> <textarea className="tags" placeholder="Please add up to 3 tags to describe what your question is about e.g., Java" onChange={(event) => {
          setNewTags(event.target.value)
        }} />

        <div>
          <button onClick={createUser} className="button">Post</button>
        </div>
        <br />
      </div>
    </>

  );
}

export default ARTICLES
