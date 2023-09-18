"use client"
import React from 'react'
import { fetchApi } from '../../../../helpers/fetch-api'
import Image from 'next/image'
import { notFound } from 'next/navigation'
const page = async ({ params }: any) => {

    const getData = async (page = 1, pageSize = 2) => {
        const path = "/posts"
        const urlParamsObject = {
            populate: "*",


        }

        const url = await fetch("http://localhost:1337/api/posts")
        const respp = await url.json()
        console.log("AAA", respp)

        const test = await fetchApi(path, urlParamsObject)
        console.log(test.data)
        const resp = test.data.filter((a: any) => a.id == params.slug)
        console.log(resp[0].attributes
        )
        return resp
    }


    const resp = await getData()
    if (!resp) {
        return notFound()
    }
    return (
        <div>
            <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <a href="#">
                    <Image className="rounded-t-lg" src={resp[0].attributes.image.data[0].attributes.url} width={resp[0].attributes.image.data[0].attributes.width} height={resp[0].attributes.image.data[0].attributes.height} alt="" />
                </a>
                <div className="p-5">
                    <a href="#">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"> {resp[0].attributes.title}</h5>
                    </a>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400"> {resp[0].attributes.description}</p>
                    <a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Read more
                        <svg className="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 5h12m0 0L9 1m4 4L9 9" />
                        </svg>
                    </a>
                </div>
            </div>

        </div>
    )
}

export default page
