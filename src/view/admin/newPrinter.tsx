import { useCallback, useState } from 'react'

import PixelButton from 'components/pixelButton'

const NewPrinter = () => {
  const [loading, setLoading] = useState(false)

  const onNewPrinter = useCallback(async () => {
    const { kylan } = window.kylan
    setLoading(true)
    try {
      const { printerAddress } = await kylan.initializePrinter()
      console.log(printerAddress)
    } catch (err: any) {
      return window.notify({
        type: 'error',
        description: err.message,
      })
    } finally {
      setLoading(false)
    }
  }, [])

  return (
    <PixelButton onClick={onNewPrinter} loading={loading}>
      Create Printer
    </PixelButton>
  )
}

export default NewPrinter
