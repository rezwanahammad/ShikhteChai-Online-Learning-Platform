import React from 'react'
import WorkspaceProvider from './provider'

const Workspacelayout = ({ children }) => {
  return (
    <WorkspaceProvider>
        {children}
    </WorkspaceProvider>
  )
}

export default Workspacelayout
