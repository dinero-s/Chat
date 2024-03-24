import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import Logout from '../logout/logout'
import { ContextUser } from "../../context/User"

export default function Header() {
    const { user } = useContext(ContextUser)

    return (
        <div>
            {user ? <Logout /> : <><Link to="/auth"><button>AUTH</button></Link>
                <Link to="/reg"><button>REG</button></Link> </>}
        </div>
    )
}
