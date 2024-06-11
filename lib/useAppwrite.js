import { Alert } from "react-native"

const { useState, useEffect } = require("react")

export const useAppwrite = (fn) => {
    console.log('cok')
    console.log(fn)
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(true)
  
    const fetchData = async () => {
      setIsLoading(true)

      try {
        console.log('cok2')
        const response = await fn()

        console.log(response)

        setData(response)
      } catch (error) {
        Alert.alert('Error', error.message)
      }finally {
        setIsLoading(false)
      }
    }
    useEffect(() => {
  
      fetchData()
    }, [])

    const refetch = () => fetchData();
  
    return { data, isLoading, refetch}    

}