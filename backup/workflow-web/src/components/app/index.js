import React from 'react'
import './styles.css'
import CommandsNav from '../commands-nav'
import { DragDropContext } from 'react-beautiful-dnd'

function App() {
  return (
    // <DragDropContext>
    <div className="App">
      <header>
        <CommandsNav />
      </header>
    </div>
    // </DragDropContext>
  )
}

export default App
