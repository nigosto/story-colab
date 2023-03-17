import { getSession } from "next-auth/react"
import { useRouter } from "next/router";
import { useEffect, useState } from "react"

export default function Home() {
  const [session, setSession] = useState();
  const router = useRouter();

  useEffect(() => {
    getSession().then((s) => {
      if(s) {
        setSession(s);
      }else {
        setSession(undefined)
      }
    })
  }, [router])

  return <section>{session ? session.user.username : "No user"}</section>
}
