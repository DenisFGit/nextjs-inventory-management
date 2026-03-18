import Sidebar from "./sidebar"
import { ReactNode } from "react"




export default function Layout({ children }: { children: ReactNode }) {
    return (
        <>
            <Sidebar currentPath="/dasboard" />
            <main>{children}</main>

        </>
    )
}