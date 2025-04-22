import { useEffect } from "react";
import SockJS from "sockjs-client";
import { CompatClient, Stomp } from "@stomp/stompjs";

let stompClient = null;

const useWebSocket = (onMessage) => {
    useEffect(() => {
        const socket = new SockJS("https://backend.henamedmarkt.com/ws");
        //const socket = new SockJS("http://localhost:8080/ws");
        stompClient = Stomp.over(socket);

        stompClient.connect({}, () => {
            console.log("WebSocket connected");

            stompClient.subscribe("/topic/newOrder", (message) => {
                console.log("Received: ", message.body);
                onMessage(message.body); // Call passed callback
            });
        });

        return () => {
            if (stompClient) {
                stompClient.disconnect();
            }
        };
    }, []);
};

export default useWebSocket;
