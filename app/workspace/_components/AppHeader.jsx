import { UserButton } from '@clerk/nextjs'
import {SidebarTrigger } from '../../../@/components/ui/sidebar'
import React from 'react'

const AppHeader = () => {
  return (
    <div className='p-4 flex justify-between items-center shadow-sm'>
        <SidebarTrigger/>
        <UserButton />
    </div>
  )
}

export default AppHeader
