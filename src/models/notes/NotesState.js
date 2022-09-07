// import react from "react";
import { useState } from "react";
import noteContext from "./notesContext";

const NoteState = (props) => {
  const host = "hhttp://127.0.0.1:5000";
  const notesInitiely = [];
  const [notes, setNotes] = useState(notesInitiely);

  //fatch all notes

    
  
  const getNotes = async () => {
    try {
    const response = await fetch(`${host}/api/todo/fatchalltodos`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('token'),
      },
    });
    const json = await response.json();
    setNotes(json);
  } catch (error) {
    console.log("some eoor occurd")
}
}

  //add note   
  
  const addNote = async (title, description, teg) => {
    try {
    const response = await fetch(`${host}/api/todo/addtodo`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('token'),
      },
      body: JSON.stringify({
        title: title,
        description: description,
        teg: teg,
      }),
    });
    const note =  await response.json();
    setNotes(notes.concat(note));
  }catch (error) {
    console.log("some error occurd")
} 
}

  //Delet note
  
    
  
  const deletNote = async (id) => {
    //api call
    try {
    const response = await fetch(`${host}/api/todo/deletetodo/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('token'),
      },
    });
    const json = await response.json();
    console.log(json)

    //logic
    const newNote = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNote);
   
  }catch (error) {
    console.log("some eoor occurd")
  }
} 
  //Edit note

    
  
  const editNote = async (id, title, description, teg) => {
    //api call
    try {
    const response = await fetch(`${host}/api/todo/updateTodo/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('token'),
      },
      body: JSON.stringify({title, description, teg}),
    });
    const json =await response.json();
    console.log(json)
    //logic to edit in client
      const newNote=JSON.parse(JSON.stringify(notes))
    for (let index = 0; index < newNote.length; index++) {
      const element = newNote[index];
      if (element._id === id) {
        newNote[index].title = title;
        newNote[index].description = description;
        newNote[index].teg = teg;
        break;
      }
    }
  }catch (error) {
    console.log("some eoor occurd")
  }
} 

  return (
    <noteContext.Provider
      value={{ notes, addNote, editNote, deletNote, getNotes }}
    >
      {props.children}
    </noteContext.Provider>
  );
};

export default NoteState;
