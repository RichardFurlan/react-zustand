import { useState } from 'react'
import './App.css'
import Column from './components/Column'

function App() {

  return (
    <div className='App'>
      <Column state= "ToDo"/>
      <Column state = "InProgress" />
      <Column state = "Done"/>
    </div>
  )
}

export default App
