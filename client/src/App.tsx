import { useEffect } from "react"
import { io } from "socket.io-client"

const socket = io('ws://localhost:3000')


function App() {
  useEffect(() => {
    socket.on('after connection', (data) => {
      console.log(data);
    })
  }, [])
  return (
    <>
      <div className='text-red-500'>hello this is me kdrai</div>
    </>
  )
}

export default App
