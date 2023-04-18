import * as dotenv from "dotenv"
dotenv.config()

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { TonConnectUIProvider } from "@tonconnect/ui-react"
import ReactDOM from "react-dom/client"
import App from "./App"
import "./index.css"
import { LoadScript } from "@react-google-maps/api"
// this manifest is used temporarily for development purposes
const manifestUrl = "https://toncash.github.io/ui/tonconnect-manifest.json"

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false } },
})
const libraries = ["geometry"] as ["geometry"]

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <TonConnectUIProvider manifestUrl={manifestUrl}>
    <QueryClientProvider client={queryClient}>
      <LoadScript googleMapsApiKey={import.meta.env.VITE_MAP_API} libraries={libraries}>
        <App />
      </LoadScript>
    </QueryClientProvider>
  </TonConnectUIProvider>
)
