import React from 'react'
import { useEffect, useState } from 'react';
import { db } from './firebase';
import { collection, getDocs, addDoc } from "firebase/firestore"

function Questions() {
  const [newDate, setNewDate] = useState(0)
  const [newDesc, setNewDesc] = useState("")
  const [setTitle, setNewTitle] = useState("")
  const [setTag, setNewTag] = useState("")
  const [users, setUsers] = useState([])

  const usersCollectionRef = collection(db, "question")


  const createUser = async () => {
    await addDoc(usersCollectionRef, { desc: newDesc, title: setTitle, tag: setTag, date: newDate })
  }

 useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    }
    getUsers()
  }, [])

  return (
    <>
      <div className='what'>
        <h2 className="h2">WHAT DO YOU WANT TO ASK AND SHARE</h2>
      </div>
      <div className="all">

        <div className="q">Title: </div>
        <input className="title" type='text' placeholder='Start your question with how, what, why, etc.' onChange={(event) => {
          setNewTitle(event.target.value);
        }} />

        <div className="q">Describe your problem: </div>
        <textarea type='text' className="problem" onChange={(event) => {

          setNewDesc(event.target.value);
        }} />

        <div className='q'>
          <label>Date:</label>
          <input
            type="date"
            placeholder="Enter Date"
            className='dateBox'
            onChange={(event) => {
              setNewDate(event.target.value);
            }}
          />
        </div>

        <div className="q">Tags: </div>
        <textarea type='text' className="tags" placeholder="Please add up to 3 tags to describe what your question is about e.g., Java" onChange={(event) => {
          setNewTag(event.target.value);
        }} />

        <div>
          <button onClick={createUser} className="button">Post</button>
        </div>
        <br />
      </div>
    </>
  );
}

export default Questions
