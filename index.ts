"use client";

import "client-only";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

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

const useSearchRouter = (props?: SearchRouterProps): SearchRouterReturn => {
  const router = useRouter();
  const pathname = usePathname() ?? "/";
  const searchParams = useSearchParams();

  const [href, setHref] = useState<URL | null>(null);

  useEffect(() => {
    if (href !== null || typeof window === "undefined") return;

    const newHref = new URL(
      pathname,
      props?.baseUrl ?? window.location.hostname
    );
    searchParams.forEach((value, key) => {
      newHref.searchParams.set(key, value);
    });

    setHref(newHref);
  }, [href, pathname, searchParams]);

  const addRouteParam = (paramName: string, paramValue: string): void => {
    if (!href) throw new Error("Cannot get base url");

    const param = searchParams.get(paramName);
    href.searchParams.set(
      paramName,
      param ? `${param},${paramValue}` : paramValue
    );
  };

  const updateRouteParam = (paramName: string, paramValue: string): void => {
    if (!href) throw new Error("Cannot get base url");

    href.searchParams.set(paramName, paramValue);
  };

  const removeRouteParam = (paramName: string, paramValue: string): void => {
    if (!href) throw new Error("Cannot get base url");

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

  const resetRoute = (): void => {
    if (typeof window === "undefined") return;

    const baseHref = new URL(
      pathname,
      props?.baseUrl ?? window.location.hostname
    );
    router.replace(baseHref.toString());
  };

  const dispatch = (): void => {
    if (!href) throw new Error("Cannot get base url");

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
