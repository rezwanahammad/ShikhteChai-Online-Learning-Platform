"use client"

import Image from 'next/image'
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '../../../@/components/ui/sidebar'
import { Button } from '../../../@/components/ui/button'
import { Book, Compass, LayoutDashboard, PencilRulerIcon, WalletCards } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'


    const SideBarOptions=[
        {
            title: "Dashboard",
            icon : LayoutDashboard,
            path: "/workspace"
        },
         {
            title: "My learning",
            icon : Book,
            path: "/workspace/my-courses"
        },
         {
            title: "Explore courses",
            icon : Compass,
            path: "/workspace/explore"
        },
         {
            title: "AI Tools",
            icon : PencilRulerIcon,
            path: "/workspace/ai-tools"
        },
        
         {
            title: "Billing",
            icon : WalletCards,
            path: "/workspace/billing"
        },

    ]

    export function AppSidebar() {

        const path=usePathname();
    return (
        <Sidebar>
        <SidebarHeader className={"p-4"} >
            <Image
                src="/logo.svg"
                alt="Logo"
                width={30}
                height={30}
            />
        </SidebarHeader>
        <SidebarContent>
            <SidebarGroup >
            <Button>Create New Course</Button>
            </SidebarGroup>
            <SidebarGroup >
            <SidebarGroupContent>
                <SidebarMenu>
                    {SideBarOptions.map((item,index) => (
                        <SidebarMenuItem key={index}>
                            <SidebarMenuButton asChild className={'p-4'}>
                                <Link href={item.path} className={`text-[16px]
                                        ${path.includes(item.path) && 'text-primary'}`}>
                                <item.icon className='w-7 h-7'/>
                                <span>{item.title}</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarGroupContent>
            </SidebarGroup>  
        </SidebarContent>
        <SidebarFooter />
        </Sidebar>
    )
    }