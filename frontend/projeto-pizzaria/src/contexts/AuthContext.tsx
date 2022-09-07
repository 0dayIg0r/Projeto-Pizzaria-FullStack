// React imports
import { createContext, ReactNode, useState } from 'react'


// Nookie
import { destroyCookie, setCookie, parseCookies } from 'nookies'

// Next router
import Router from 'next/router'
import { api } from '../../styles/services/apiClient'



type AuthContextData = {
    user: UserProps
    isAuthenticated: boolean
    sigIn: (credentials: SigInProps) => Promise<void> // if async function promise
    singOut: () => void
    singUp: (credentials: SingUpProps) => Promise<void>
}


type UserProps = {
    id: string,
    name: string,
    email: string
}

type SigInProps = {
    email: string,
    password: string
}

type AuthProviderProps = {
    children: ReactNode
}

type SingUpProps = {
    name: string,
    email: string,
    password: string
}

export const AuthContext = createContext({} as AuthContextData)

export function singOut() {
    try {
        destroyCookie(undefined, 'token')

        Router.push('/')

    } catch (e) {
        console.log(e.message)
    }
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<UserProps>()
    const isAuthenticated = !!user // convert to boolean, if state user set isAuthenticated to true

    async function sigIn({ email, password }: SigInProps) {
        try {
            const res = await api.post('/login', {
                email,
                password
            })
            const { id, name, token } = res.data
            setCookie(undefined, 'token', token, {
                maxAge: 60 * 60 * 24 * 30, // Expires in 1 month
                path: '/' // All routes get access to the token

            })

            setUser({
                id,
                name,
                email
            })

            // Next requests recive the token
            api.defaults.headers['Authorization'] = `Bearer ${token}`

            // Redirect user to dashboard
            Router.push('/dashboard')
        } catch (e) {
            console.log(e.message)
        }

    }

    async function singUp({name, email, password}: SingUpProps) {
        
        try {
            const res = await api.post('/register',{
                name,
                email,
                password
            })

            Router.push('/')
            
            return res.data
            
        } catch (e) {
            console.log(e.message)
        }

    }

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, sigIn, singOut, singUp }}>
            {children}
        </AuthContext.Provider>
    )
}

