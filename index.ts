"use client";

import "client-only";

import {
  usePathname,
  useRouter,
  useSearchParams,
  type ReadonlyURLSearchParams,
} from "next/navigation";
import { useEffect, useState } from "react";

interface SearchRouterReturn {
  addRouteParam: (paramName: string, paramValue: string) => void;
  updateRouteParam: (paramName: string, paramValue: string) => void;
  removeRouteParam: (paramName: string, paramValue?: string) => void;
  resetRoute: () => void;
  dispatch: () => void;
  searchParams: ReadonlyURLSearchParams;
}

const useSearchRouter = (): SearchRouterReturn => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [params, setParams] = useState<URLSearchParams | null>(null);

  useEffect(() => {
    setParams(new URLSearchParams(searchParams.toString()));
  }, [searchParams]);

  const addRouteParam = (paramName: string, paramValue: string): void => {
    if (!params) throw new Error("Cannot get base url");

    const param = searchParams.get(paramName);
    params.set(paramName, param ? `${param},${paramValue}` : paramValue);
  };

  const updateRouteParam = (paramName: string, paramValue: string): void => {
    if (!params) throw new Error("Cannot get base url");

    params.set(paramName, paramValue);
  };

  const removeRouteParam = (paramName: string, paramValue?: string): void => {
    if (!params) throw new Error("Cannot get base url");

    if (paramValue === undefined) {
      params.delete(paramName);
      return;
    }

    const param = searchParams.get(paramName);
    if (!param) return;
    const paramItemsArray = param.split(",");
    const paramRemoveIndex = paramItemsArray.findIndex(
      (paramItem: string) => paramItem === paramValue
    );
    if (paramRemoveIndex === -1) return;
    paramItemsArray.splice(paramRemoveIndex, 1);
    if (paramItemsArray.length > 0) {
      params.set(paramName, paramItemsArray.join(","));
    } else {
      params.delete(paramName);
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
    updateRouteParam,
    removeRouteParam,
    resetRoute,
    dispatch,
    searchParams,
  };
};

export { useSearchRouter };
