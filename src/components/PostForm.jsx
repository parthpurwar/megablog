import React , {useCallback} from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Button,Input, RTE, Select} from "."
import service, { Service } from '../appwrite/config'

function PostForm() {
    const {register, handleSubmit, watch, setValue, control, getValues}= useForm({
        defaultValues:{
            title: post?.title || ' ',
            slug: post?.slug|| ' ',
            content: post?.content || ' ',
            status: post?.status || 'active',
        },
    })
    const navigate = useNavigate()
    const userData = useSelector(state => state.user.userData)

    const submit= async (data) => {
        if(post){
           const file =  data.image[0] ?service.
           uploadFile(data.image[0]) : null

           if(file){
            service.deleteFile(post.featured_image)
           }
           const dbpost = await service.updatePost(
            post.$id, {
                ...data,
                featured_image : file ? file.$id : undefined,

                if(dbpost){
                    navigate(`/post/${dbpost.$id}`)
                }
            }
           )
        }
        else{
            const file = await service.uploadFile(data.image[0])
            if(file){
                const fileId = file.$id
                data.featured_image = fileId
                const dbpost = await service.createpost({
                    ...data,
                    userId: userData.$id,
                })
                if(dbpost){
                    navigate(`/post/${dbpost.$id}`)
                }
            }
        }
    }

    const slugTransform = useCallback((value) =>{
            if(value && typeof value === 'string'){
                return value
                .trim()
                .toLowerCase()
                .replace(/^[a-zA-Z\d\s]+/g, '-')
                .replace(/\s/g, '-')
            }
            return ''
    },[])

React.useEffect(()=>{
    const subscription = watch((value, {name})=>{
            if(name === 'title'){
                setValue('slug', slugTransform(value.title,
                    {shouldValidate: true}
                ))
            }
    })
    return ()=>{
        subscription.unsubscribe()
    }
},[watch, slugTransform, setValue])

    return (
        <></>
    )
}

export default PostForm
