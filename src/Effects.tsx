import { useState, useEffect, useCallback } from 'react';
import { subscribe, unsubscribe } from './resources/API';

export function Effects(props: { sourceId: string }) {
    const [lastMessage, setLastMessage] = useState(-1);
    
    const handleNewMessage = useCallback((message: number) => {
        setLastMessage(message);
    }, []);
    
    useEffect(() => {
        subscribe(props.sourceId, handleNewMessage);
        return () => unsubscribe(props.sourceId, handleNewMessage);
    }, [props.sourceId, handleNewMessage]);
    
    useEffect(() => {
        setLastMessage(-1);
    }, [props.sourceId]);
    
    return <div>{props.sourceId}: {lastMessage}</div>;
}