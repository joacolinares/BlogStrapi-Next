import qs from 'qs'
import { getStrapiURL } from './api-help'
export const fetchApi = async (
    path: string,
    urlParamsObject = {},
    options = {}
) => {
    try {
        const mergedOptions = {
            next: { revalidate: 60 },
            ...options,
            headers: {
                "Content-Type": "application/json"
            }
        }
        console.log("data")
        const queryString = qs.stringify(urlParamsObject, { encodeValuesOnly: true })
        console.log({ queryString })

        const requestUrl = getStrapiURL("/api" + path + "?" + queryString) //+ queryString
        console.log({ requestUrl })
        const res = await fetch(requestUrl, mergedOptions)

        const data = await res.json()

        return data

    } catch (error) {


    }


}