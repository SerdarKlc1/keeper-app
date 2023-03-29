import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";

function App() {
  const [notes, setNotes] = useState(()=>JSON.parse(localStorage.getItem("notes"??"[]")));

  useEffect(()=>{
    localStorage.setItem("notes",JSON.stringify(notes))
    ;
    if(notes.length===0){document.title = "Keeper App";}
    else if (notes.length===1){document.title="1 note"}
    else if (notes.length>=2){
        document.title=`${notes.length} notes`
    }
    }, [notes]);
  function addNote(newNote) {
    setNotes(prevNotes => {
      return [...prevNotes, newNote];
    });
  }

  function deleteNote(id) {
    setNotes(prevNotes => {
      return prevNotes.filter((noteItem, index) => {
        return index !== id;
      });
    });
  }

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {notes.map((noteItem, index) => {
        return (
          <Note
            key={index}
            id={index}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default App;
