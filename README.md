## ⭐️ About

NextJs Search Router is a library built for the NextJs ecosystem, focused on simplifying the creation of complex search routes commonly used in eCommerce and similar applications. This library provides React hooks that make it easy to manage and update URL parameters, allowing developers to implement search, filtering, and sorting functionalities in a more intuitive way.

### Use Case Example

In an eCommerce application, users often want to filter products by various criteria (e.g., price, category, rating) and see these filters reflected in the URL. With NextJs Search Router, you can easily add, update, and remove URL parameters dynamically, giving users a smooth and interactive search experience without needing to handle manual URL parsing.

## 🚀 Getting Started

Install using an package manager

```bash
pnpm add @alpakaslab/nextjs-search-router
# or
yarn add @alpakaslab/nextjs-search-router
# or
npm install @alpakaslab/nextjs-search-router
```

## 🧩 Using the Package

```tsx
"use client";

import { useSearchRouter } from "@alpakaslab/nextjs-search-router";

export default function Page() {
  const { addRouteParam, dispatch, ... } = useSearchRouter();

  return <></>;
}
```

## 📕 Available Types

### `RouteParam`

Use the `RouteParam` type when you want to add or update parameters in the URL. This type is utilized in hooks like `addRouteParam` and `updateRouteParams` to define a search parameter that will be reflected in the URL.

For example:

```ts
const param: RouteParam = { name: string; value: string }
addRouteParam({ name: "category", value: "electronics" });
```

In this example, `RouteParam` is used to add or update the "category" parameter with the value "electronics" in the URL.

### `RouteParamDelete`

Use the `RouteParamDelete` type when you want to remove parameters from the URL. This type is used with the `removeRouteParam` hook and allows you to remove a specific value from a parameter or delete the entire parameter if no value is provided.

For example:

```ts
const param: RouteParamDelete = { name: string; value?: string }
removeRouteParam({ name: "category", value: "electronics" });
```

In this example, RouteParamDelete is used to remove the "electronics" value from the "category" parameter. If the value is not provided, the entire "category" parameter will be removed from the URL.

## 🔨 Hook Functions

### `addRouteParam()`

Adds a new route parameter to the URL. If the parameter already exists, the value is concatenated with a comma (,), avoiding duplicate values.

```tsx
// initial url -> example.com

addRouteParam({ name: "id", value: "1" }); // -> example.com?id=1

addRouteParam({ name: "id", value: "2" }); // -> example.com?id=1,2

addRouteParam({ name: "page", value: "3" }); // -> example.com?id=1,2&page=3
```

### `updateRouteParams()`

Replaces parameters in the URL, allowing you to update one or multiple parameters at once, overriding any existing values.

```tsx
// initial url -> example.com

updateRouteParams({ name: "id", value: "3" }); // -> example.com?id=3

updateRouteParams([
  { name: "id", value: "1" },
  { name: "page", value: "2" },
]); // -> example.com?id=1&page=2
```

### `removeRouteParam()`

Removes a parameter or a specific value from a parameter in the URL. If value is not provided, the entire parameter is removed.

```tsx
// initial url -> example.com?id=1,3,7&page=2&values=22,34

removeRouteParam({ name: "id", value: "3" }); // -> example.com?id=1,7&page=2&values=22,34

removeRouteParam({ name: "values" }); // -> example.com?id=1,7&page=2
```

### `resetRoute()`

Removes all search parameters from the URL, leaving only the base domain.

```tsx
// initial url -> example.com?id=1,3,7&page=2&values=22,34

resetRoute(); // -> example.com
```

### `dispatch()`

Applies all changes made to the URL, pushing them to the browser and updating the page. You must call dispatch after using other parameter manipulation functions to reflect changes in the URL.

```tsx
addRouteParam({ name: "id", value: "1" });
updateRouteParams({ name: "id", value: "4" });
removeRouteParam({ name: "values" });

dispatch(); // -> apply all modifications above to Browser URL
```
