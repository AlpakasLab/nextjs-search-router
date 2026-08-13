export type RouteParams = {
  set: Array<{ name: string; value: unknown }>;
  delete: Array<{ name: string } | { name: string; value: unknown }>;
};
