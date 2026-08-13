"use client";

import "client-only";

import {
  usePathname,
  useRouter,
  useSearchParams,
  type ReadonlyURLSearchParams,
} from "next/navigation";
import { useEffect, useState } from "react";
import { RouteParams } from "./types";
import { formatParamValue } from "./format";

type SearchRouterReturn = {
  updateRoute: (params: RouteParams) => void;
  resetRoute: () => void;
  dispatch: () => void;
  searchParams: ReadonlyURLSearchParams;
};

export function useSearchRouter(): SearchRouterReturn {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [routeParams, setRouteParams] = useState<URLSearchParams | null>(null);

  useEffect(() => {
    setRouteParams(new URLSearchParams(searchParams.toString()));
  }, [searchParams]);

  const updateRoute = (params: RouteParams): void => {
    if (!routeParams) throw new Error("Cannot update route");
    params.set.forEach((param) =>
      routeParams.set(param.name, formatParamValue(param.value))
    );
    params.delete.forEach((param) =>
      routeParams.delete(
        param.name,
        "value" in param ? formatParamValue(param.value) : undefined
      )
    );
  };

  const resetRoute = (): void => {
    if (typeof window === "undefined") return;
    const baseHref = new URL(pathname, window.location.origin);
    router.replace(baseHref.toString());
  };

  const dispatch = (): void => {
    if (!routeParams) throw new Error("Cannot get base url");
    router.push(`${pathname}?${routeParams.toString()}`);
  };

  return {
    updateRoute,
    resetRoute,
    dispatch,
    searchParams,
  };
}
