import {WebSocket} from "nextjs-websocket"

export default function WaitingRoom() {
    const handleMessage = (data) => {
        const res = JSON.parse(data);
        console.log(res)
    }

    return <div>Waiting room
        <WebSocket url='' onMessage={handleMessage} />
    </div>
}