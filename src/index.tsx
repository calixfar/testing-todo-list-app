import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import TodoContainer from './views/todo/todo-container'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)
root.render(
  <React.StrictMode>
    <TodoContainer />
  </React.StrictMode>
)
