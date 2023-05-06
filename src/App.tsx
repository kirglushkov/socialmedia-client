import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import styled from '@emotion/styled'
import { Circle } from './components/StyledSquare'
import Field from './components/registration/Field'
import Login from './components/login/Login'

const StyledComponent = styled.div`
  font-size: large;
  font-style: italic;
  font-weight: 600;
  color: ${(props) => props.color};
`

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <Login />
    </div>
  )
}

export default App
