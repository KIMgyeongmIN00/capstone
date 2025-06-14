"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactNode, useRef } from "react"

export default function TQProvider({ children }: { children: ReactNode }) {
  const queryClientRef = useRef<QueryClient>()
  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient()
  }
  return <QueryClientProvider client={queryClientRef.current}>{children}</QueryClientProvider>
} 