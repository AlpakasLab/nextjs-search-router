import { useRouter } from 'next/router'

const useSearchRouter = () => {
    const router = useRouter()
    const queryParams = router.query ?? null

    const addRouteParam = (paramName: string, paramValue: string): void => {
        if (queryParams[paramName]) {
            queryParams[paramName] = `${queryParams[paramName]},${paramValue}`
        } else {
            queryParams[paramName] = paramValue
        }

        router.push(
            {
                pathname: router.pathname,
                query: queryParams
            },
            undefined,
            {
                shallow: false
            }
        )
    }

    const updateRouteParam = (paramName: string, paramValue: string): void => {
        queryParams[paramName] = paramValue

        router.push(
            {
                pathname: router.pathname,
                query: queryParams
            },
            undefined,
            {
                shallow: false
            }
        )
    }

    const removeRouteParam = (paramName: string, value: string): void => {
        const paramText = queryParams[paramName]

        if (typeof paramText === 'string') {
            const paramItemsArray = paramText.split(',')
            const paramRemoveIndex = paramItemsArray.findIndex(
                (paramItem: string) => paramItem === value.toString()
            )

            if (paramRemoveIndex !== -1) {
                paramItemsArray.splice(paramRemoveIndex, 1)
            }

            if (paramItemsArray.length > 0) {
                queryParams[paramName] = paramItemsArray.join(',')
            } else {
                delete queryParams[paramName]
            }
        }

        router.push(
            {
                pathname: router.pathname,
                query: queryParams
            },
            undefined,
            {
                shallow: false
            }
        )
    }

    const addRoutePath = (mainPath: string, path: string): void => {
        const mainPathValues = queryParams[mainPath]

        if(mainPathValues === undefined) return

        if (typeof mainPathValues !== 'string') {
            mainPathValues.push(path)
        }

        queryParams[mainPath] = mainPathValues

        router.push(
            {
                pathname: router.pathname,
                query: queryParams
            },
            undefined,
            {
                shallow: false
            }
        )
    }

    const updateRoutePath = (mainPath: string, newPath: string): void => {
        queryParams[mainPath] = newPath.split('/')

        router.push(
            {
                pathname: router.pathname,
                query: queryParams
            },
            undefined,
            {
                shallow: false
            }
        )
    }

    const removeRoutePath = (mainPath: string, value: string): void => {
        const mainPathValues = queryParams[mainPath]
        
        if(mainPathValues === undefined) return

        if (
            typeof mainPathValues !== 'string' &&
            mainPathValues !== undefined
        ) {
            const routeRemoveIndex = mainPathValues.findIndex(
                (routeValue: string) => routeValue === value.toString()
            )

            if (routeRemoveIndex !== -1) {
                mainPathValues.splice(routeRemoveIndex, 1)
            }
        }

        queryParams[mainPath] = mainPathValues

        router.push(
            {
                pathname: router.pathname,
                query: queryParams
            },
            undefined,
            {
                shallow: false
            }
        )
    }

    const switchRoute = (
        mainPath: string,
        path: string,
        removeParam: string,
        newParams: Record<string, string>
    ): void => {
        delete queryParams[removeParam]

        const params = Object.assign(newParams, queryParams)

        router.push(
            {
                pathname: `/${mainPath}/${path}`,
                query: params
            },
            undefined,
            {
                shallow: false
            }
        )
    }

    const resetRoute = (baseParam: string): void => {
        for (const key in queryParams) {
            if (baseParam !== key) {
                delete queryParams[key]
            }
        }

        router.replace({
            pathname: router.pathname,
            query: queryParams
        })
    }

    return {
        addRouteParam,
        updateRouteParam,
        removeRouteParam,
        addRoutePath,
        updateRoutePath,
        removeRoutePath,
        switchRoute,
        resetRoute
    }
}

export { useSearchRouter }
