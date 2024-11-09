"use client";

import "client-only";

import {
  usePathname,
  useRouter,
  useSearchParams,
  type ReadonlyURLSearchParams,
} from "next/navigation";
import { useEffect, useState } from "react";

type RouteParam = { name: string; value: string };
type RouteParamDelete = Pick<RouteParam, "name"> &
  Partial<Pick<RouteParam, "value">>;

type SearchRouterReturn = {
  addRouteParam: (param: RouteParam) => void;
  updateRouteParams: (param: RouteParam | RouteParam[]) => void;
  removeRouteParam: (param: RouteParamDelete) => void;
  resetRoute: () => void;
  dispatch: () => void;
  searchParams: ReadonlyURLSearchParams;
};

const useSearchRouter = (): SearchRouterReturn => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [params, setParams] = useState<URLSearchParams | null>(null);

  useEffect(() => {
    setParams(new URLSearchParams(searchParams.toString()));
  }, [searchParams]);

  const addRouteParam = (param: RouteParam): void => {
    if (!params) throw new Error("Cannot get base url");
    const currentParam = searchParams.get(param.name);
    params.set(
      param.name,
      currentParam ? `${currentParam},${param.value}` : param.value
    );
  };

  const updateRouteParams = (param: RouteParam | RouteParam[]): void => {
    if (!params) throw new Error("Cannot get base url");
    const paramsToUpdate = Array.isArray(param) ? param : [param];
    paramsToUpdate.forEach((paramItem) => {
      params.set(paramItem.name, paramItem.value);
    });
  };

  const removeRouteParam = (param: RouteParamDelete): void => {
    if (!params) throw new Error("Cannot get base url");

    if (param.value === undefined) {
      params.delete(param.name);
      return;
    }

    const currentParam = searchParams.get(param.name);
    if (!currentParam) return;
    const paramItemsArray = currentParam.split(",");
    const paramRemoveIndex = paramItemsArray.findIndex(
      (paramItem: string) => paramItem === param.value
    );
    if (paramRemoveIndex === -1) return;
    paramItemsArray.splice(paramRemoveIndex, 1);
    if (paramItemsArray.length > 0) {
      params.set(param.name, paramItemsArray.join(","));
    } else {
      params.delete(param.name);
    }
  };

  const resetRoute = (): void => {
    if (typeof window === "undefined") return;

    const baseHref = new URL(pathname, window.location.origin);
    router.replace(baseHref.toString());
  };

  const dispatch = (): void => {
    if (!params) throw new Error("Cannot get base url");
    router.push(`${pathname}?${params.toString()}`);
  };

  return {
    addRouteParam,
    updateRouteParams,
    removeRouteParam,
    resetRoute,
    dispatch,
    searchParams,
  };
};

export { useSearchRouter };
