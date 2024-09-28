import { useMedia } from 'react-use'

const usePCScreen = () => {
  const isPC = useMedia('(min-width: 1024px)')
  return isPC
}

export default usePCScreen