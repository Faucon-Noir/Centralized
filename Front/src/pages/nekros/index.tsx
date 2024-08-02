import UserData from "@/utils/User/UserData"
import { useEffect, useState } from "react"

export default function Nekros() {
    const [user, setUser] = useState<any>();
    useEffect(() => {
        UserData().then(result => {
            setUser(result)
        })
    }, [])
    console.log(user);

    return (
        <>
            <h1>Yo</h1>
        </>
    )
} 