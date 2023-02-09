## ⭐️ About
NextJs Search Router is a library built for the NextJs 13 ecosystem, focused on helping create complex routes. The main objective is to be able to work with search routes, usually related to eCommerce, in a simpler way using react hooks.

## 🚀 Getting Started
Install using an package manager
```bash
pnpm add @alpakaslab/nextjs-search-router
# or
yarn add @alpakaslab/nextjs-search-router
# or
npm install @alpakaslab/nextjs-search-router
```

## 🧩 Using Component
```tsx
import { useSearchRouter } from '@alpakaslab/nextjs-search-router'

const Page = () => {
    const {...} = useSearchRouter({ baseUrl: 'http://localhost:3000/' })

    return <></>
}

export default Page;
```
## 🔨 Hook Functions

`addRouteParam()` - This function receives a key and a value as a parameter and adds it to the url, if the key already exists in the query, it concatenates using "`,`"
```tsx
    const { addRouteParam } = useSearchRouter()

    return (
        <button onClick={()=>addRouteParam("id",1)}>
            Filter by ID
        </button>
    )
```