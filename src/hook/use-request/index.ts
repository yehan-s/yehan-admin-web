import { useCallback, useEffect, useRef, useState } from 'react'
import { Response } from '@/request'

interface RequestOptions {
  manual?: boolean
  defaultParams?: any[]
}

interface RequestResponse<T> {
  error: boolean | undefined
  data: T | undefined
  loading: boolean
  run(...params: any): void
  runAsync(...params: any): Response<T>
  refresh(): void
}

export function useRequest<T>(
  serviceMethod: (...args: any) => Response<T>,
  options?: RequestOptions
): RequestResponse<T> {
  const [loading, setLoading] = useState<boolean>(false)
  const [data, setData] = useState<T>()
  const [error, setError] = useState<boolean>()

  const paramsRef = useRef<any[]>([])

  const resolveData = async () => {
    setLoading(true)
    const [error, requestdata] = await serviceMethod(...(options?.defaultParams || []))
    setLoading(false)
    setData(requestdata)
    setError(error)
  }

  const runAsync = useCallback(
    async (...params: any) => {
      paramsRef.current = params
      setLoading(true)
      const res = await serviceMethod(...params)
      setLoading(false)
      return res
    },
    [serviceMethod]
  )

  const run = useCallback(
    async (...params: any) => {
      setLoading(true)
      const [error, requestData] = await serviceMethod(...params)
      setLoading(false)
      setData(requestData)
      setError(error)
    },
    [serviceMethod]
  )

  const refresh = useCallback(async () => {
    runAsync(...paramsRef.current)
  }, [runAsync])

  useEffect(() => {
    if (!options?.manual) {
      resolveData()
    }
  }, [options])

  return {
    loading,
    error,
    data,
    run,
    runAsync,
    refresh,
  }
}
