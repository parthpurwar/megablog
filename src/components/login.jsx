import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login as authLogin } from '../store/authslice'
import {Button, Input, Logo} from './index'
import { useDispatch } from 'react-redux'
import authservice from '../appwrite/auth'
import {useForm} from "react-hook-form"

function Login() {

    const navigate = useNavigate()
    const dispatch = useDispatch
    const {register, handleSubmit}= useForm()
    const [error, setError] = useState("")

    const login = async(data)=>{
        setError("")
        try{
            console.log("Anushka")
               const session=  await authservice.login(data)
               if(session){
                console.log("siddhartha")
                const userData = await authservice.getCurrentUser()
                if(userData) dispatch(authLogin(userData));
                navigate("/")//navigate sends the user to another elemet just like link but without clicking on it
               }
               console.log("garima")
        }
        catch(error){
            setError(error.message)
        }
    }


    return (
        <div
    className='flex items-center justify-center w-full'
    >
        <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
        <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
        <p className="mt-2 text-center text-base text-black/60">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        <form onSubmit={handleSubmit(login)} className='mt-8'>
        {/* //handlesubmit is a method where we pass our method on how we wanna system to haondle login */}
            <div className='space-y-5'>
                <Input
                label="Email: "
                placeholder="Enter your email"
                type="email"
                //below syntax is mandatory if you use useForm metod to create forms in react
                {...register("email", {
                    required: true,//now we use a validate option which is completely optional and we ive it a matchpattern to compare with the input email
                    validate: {
                        matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                        "Email address must be a valid address",
                    }
                })}
                />
                <Input
                label="Password: "
                type="password"
                placeholder="Enter your password"
                {...register("password", {
                    required: true,
                })}
                />
                <Button
                type="submit"
                className="w-full"
                >Sign in</Button>
            </div>
        </form>
        </div>
    </div>
    )
}

export default Login
