import React from 'react'
import './ButtonToDo.css'

export const ButtonToDo = ({addtodoHandler}) => {
  return (
   <div className="buttontodo">
    <button className='todobutton'onClick={addtodoHandler}>ADD ToDo</button>
   </div>
  )
}
