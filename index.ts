import { usePathname, useRouter, useSearchParams } from 'next/navigation'

const useSearchRouter = () => {
    const router = useRouter()

    const pathname = usePathname() ?? '/'

    const searchParams = useSearchParams()

    const addRouteParam = (paramName: string, paramValue: string): void => {
        const href = new URL(pathname)
        
        const param = searchParams.get(paramName)

        searchParams.forEach((value, key) => {
            href.searchParams.set(key, value)
        })

        href.searchParams.set(paramName, param ? `${param},${paramValue}`:paramValue)

        router.push(
            href.toString(),
        )
    }

    // const updateRouteParam = (paramName: string, paramValue: string): void => {
    //     queryParams[paramName] = paramValue

    //     router.push(
    //         {
    //             pathname: pathname,
    //             query: queryParams
    //         },
    //         undefined
    //     )
    // }

    // const removeRouteParam = (paramName: string, value: string): void => {
    //     const paramText = queryParams[paramName]

    //     if (typeof paramText === 'string') {
    //         const paramItemsArray = paramText.split(',')
    //         const paramRemoveIndex = paramItemsArray.findIndex(
    //             (paramItem: string) => paramItem === value.toString()
    //         )

    //         if (paramRemoveIndex !== -1) {
    //             paramItemsArray.splice(paramRemoveIndex, 1)
    //         }

    //         if (paramItemsArray.length > 0) {
    //             queryParams[paramName] = paramItemsArray.join(',')
    //         } else {
    //             delete queryParams[paramName]
    //         }
    //     }

    //     router.push(
    //         {
    //             pathname: pathname,
    //             query: queryParams
    //         },
    //         undefined
    //     )
    // }

    // const addRoutePath = (mainPath: string, path: string): void => {
    //     const mainPathValues = queryParams[mainPath]

    //     if(mainPathValues === undefined) return

    //     if (typeof mainPathValues !== 'string') {
    //         mainPathValues.push(path)
    //     }

    //     queryParams[mainPath] = mainPathValues

    //     router.push(
    //         {
    //             pathname: pathname,
    //             query: queryParams
    //         },
    //         undefined
    //     )
    // }

    // const updateRoutePath = (mainPath: string, newPath: string): void => {
    //     queryParams[mainPath] = newPath.split('/')

    //     router.push(
    //         {
    //             pathname: pathname,
    //             query: queryParams
    //         },
    //         undefined
    //     )
    // }

    // const removeRoutePath = (mainPath: string, value: string): void => {
    //     const mainPathValues = queryParams[mainPath]
        
    //     if(mainPathValues === undefined) return

    //     if (
    //         typeof mainPathValues !== 'string' &&
    //         mainPathValues !== undefined
    //     ) {
    //         const routeRemoveIndex = mainPathValues.findIndex(
    //             (routeValue: string) => routeValue === value.toString()
    //         )

    //         if (routeRemoveIndex !== -1) {
    //             mainPathValues.splice(routeRemoveIndex, 1)
    //         }
    //     }

    //     queryParams[mainPath] = mainPathValues

    //     router.push(
    //         {
    //             pathname: pathname,
    //             query: queryParams
    //         },
    //         undefined
    //     )
    // }

    // const switchRoute = (
    //     mainPath: string,
    //     path: string,
    //     removeParam: string,
    //     newParams: Record<string, string>
    // ): void => {
    //     delete queryParams[removeParam]

    //     const params = Object.assign(newParams, queryParams)

    //     router.push(
    //         {
    //             pathname: `/${mainPath}/${path}`,
    //             query: params
    //         },
    //         undefined
    //     )
    // }

    // const resetRoute = (baseParam: string): void => {
    //     for (const key in queryParams) {
    //         if (baseParam !== key) {
    //             delete queryParams[key]
    //         }
    //     }

    //     router.replace({
    //         pathname: pathname,
    //         query: queryParams
    //     })
    // }

    return {
        addRouteParam,
    }
}

export { useSearchRouter }
