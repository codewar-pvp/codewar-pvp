import React from 'react'

import {Navbar} from './components'
import Routes from './routes'

const App = () => {
  return (
    <div>
      <Navbar />
      <hr
        style={{
          color: 'gold',
          backgroundColor: 'yellow',
          height: 1.5,
          marginTop: 0,
          marginBottom: 20,
          opacity: 0.9
        }}
      />
      <Routes />
    </div>
  )
}

export default App
