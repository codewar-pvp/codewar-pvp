import React from 'react'

import {Navbar} from './components'
import Routes from './routes'
import {Divider} from 'semantic-ui-react'

const App = () => {
  return (
    <div>
      <Navbar />
      <hr
        style={{
          color: 'gold',
          backgroundColor: 'gold',
          height: 0.5,
          opacity: 0.3
        }}
      />
      <Routes />
    </div>
  )
}

export default App
