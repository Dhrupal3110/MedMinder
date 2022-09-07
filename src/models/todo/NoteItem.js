import React from "react";
import { useContext } from "react";

import noteContext from "../notes/notesContext";

const NoteItem = (props) => {
  const context = useContext(noteContext);
    const { deletNote } = context;
  const { note ,updateNote} = props;
  return (
    <div className="col-md-3">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">
            {note.title}
            <i className="fa-regular fa-trash-can mx-2" onClick={()=>{
              deletNote(note._id);
              props.showAlert(" Deleted note Successfully","success")
            }}></i>
            <i className="fa-regular fa-pen-to-square mx-2" onClick={()=>{
              updateNote(note);
              // console.log(updateNote(note))
            }}></i>
          </h5>
          <p className="card-text"> {note.description}</p>
          <h4 className="card-tag">{note.teg}</h4>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;
