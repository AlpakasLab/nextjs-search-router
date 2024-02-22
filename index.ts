import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface SearchRouterProps {
  baseUrl?: string;
}

interface SearchRouterReturn {
  addRouteParam: (paramName: string, paramValue: string) => void;
  updateRouteParam: (paramName: string, paramValue: string) => void;
  removeRouteParam: (paramName: string, paramValue: string) => void;
  resetRoute: () => void;
  dispatch: () => void;
}

const useSearchRouter = ({
  baseUrl,
}: SearchRouterProps): SearchRouterReturn => {
  const router = useRouter();

  const pathname = usePathname() ?? "/";

  const searchParams = useSearchParams();

  const href = new URL(pathname, baseUrl ?? window.location.hostname);

  searchParams.forEach((value, key) => {
    href.searchParams.set(key, value);
  });

  const addRouteParam = (paramName: string, paramValue: string): void => {
    const param = searchParams.get(paramName);

    href.searchParams.set(
      paramName,
      param ? `${param},${paramValue}` : paramValue
    );
  };

  const updateRouteParam = (paramName: string, paramValue: string): void => {
    href.searchParams.set(paramName, paramValue);
  };

  const removeRouteParam = (paramName: string, paramValue: string): void => {
    const param = searchParams.get(paramName);

    if (!param) return;

    const paramItemsArray = param.split(",");

    const paramRemoveIndex = paramItemsArray.findIndex(
      (paramItem: string) => paramItem === paramValue
    );

    if (paramRemoveIndex === -1) return;

    paramItemsArray.splice(paramRemoveIndex, 1);

    if (paramItemsArray.length > 0) {
      href.searchParams.set(paramName, paramItemsArray.join(","));
    } else {
      href.searchParams.delete(paramName);
    }
  };

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

  const resetRoute = (): void => {
    const baseHref = new URL(pathname, baseUrl ?? window.location.hostname);
    router.replace(baseHref.toString());
  };

  const dispatch = (): void => {
    router.push(href.toString());
  };

  return {
    addRouteParam,
    updateRouteParam,
    removeRouteParam,
    resetRoute,
    dispatch,
  };
};

export { useSearchRouter };
