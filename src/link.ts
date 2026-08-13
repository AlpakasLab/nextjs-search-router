import { formatParamValue } from "./format";
import { RouteParams } from "./types";

export function generateLink(
  to: string,
  currentParams: Record<string, string>,
  newParams: RouteParams
): string {
  const params = new URLSearchParams(currentParams);
  newParams.set.forEach(({ name, value }) =>
    params.set(name, formatParamValue(value))
  );
  newParams.delete.forEach((param) =>
    params.delete(
      param.name,
      "value" in param ? formatParamValue(param.value) : undefined
    )
  );
  return `${to}?${params.toString()}`;
}
