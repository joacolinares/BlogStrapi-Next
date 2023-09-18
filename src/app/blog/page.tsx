
import React from 'react'
import { getStrapiURL } from '../../../helpers/api-help'
import { fetchApi } from '../../../helpers/fetch-api'
import PageHeader from '@/components/PageHeader'
import PageCardImg from '@/components/PageCardImg'
import { PagePagination } from '@/components/PagePagination'



const getData = async (page = 1, pageSize = 2) => {
    const path = "/posts"
    const urlParamsObject = {
        populate: "*",
        pagination: {
            page: page,
            pageSize: pageSize,
        },

    }

    const url = await fetch("http://localhost:1337/api/posts")
    const respp = await url.json()
    console.log("AAA", respp)

    const { data, meta } = await fetchApi(path, urlParamsObject)

    return {
        data,
        pagination: meta.pagination
    }
}

const page = async ({ searchParams }) => {
    const { page } = searchParams
    let pageNumber = (parseInt(page))
    const { data, pagination } = await getData(pageNumber, 2)
    { console.log("aaa", pagination) }
    return (
        <div>
            <PageHeader text={"Posts"} />


            <div className='grid gap-4'>
                {
                    data.map(post => (
                        <PageCardImg post={post} />)
                    )
                }
            </div>

            <PagePagination pagination={pagination} />
        </div>
    )
}

export default page
