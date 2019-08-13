import React from 'react'
import './styles.css'
import { Draggable } from 'react-beautiful-dnd'

function CommandsNav() {
  return (
    <div className="CommandsNav">
      <ul>
        {commands.map(command => (
          <Draggable>
            <li>{command}</li>
          </Draggable>
        ))}
      </ul>
    </div>
  )
}

const commands = ['send-email', 'send-slack-message', 'download-file']

export default CommandsNav
