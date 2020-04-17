import React, { useState, useRef } from 'react'
import { Coordinate } from '../../models/canvas';
import { useEffect } from 'react';
import { useCallback } from 'react';
import { getCoordinates } from './helpers';

export interface inputItem {
    id: string;
    text: string;
    coordinate: Coordinate | undefined;
    edit: boolean;
}

export const TextInput = (props: inputItem) => {

    const {id, coordinate} = props;
    const [text, setText] = useState(props.text);
    const [edit, setEdit] = useState(props.edit);
    const [position, setPosition] = useState(coordinate);

    const dragControlRef = useRef(null);

    const toggleEdit = () => {
        setEdit(!edit);
    }

    const updateValue = ({target: {value}}: React.ChangeEvent<HTMLInputElement>) => {
        setText(value)
    }

    const stopEdit = () => {
        setEdit(false);
    }

    const handleOnDragEnd = (event: React.DragEvent<HTMLDivElement>) => {
        const dragControl = dragControlRef.current;
        const coords = getCoordinates(event, dragControl)
        setPosition(coords);
    }

    return (
        <div 
            style={{
                position: `absolute`,
                top: position?.y,
                left: position?.x
            }}
            draggable
            onDragEnd={handleOnDragEnd}
        >
            <div className="drag-control" ref={dragControlRef} style={{display: `inline-block`, cursor: `move`}}>
                <i style={{padding: `1rem`}}>i</i>
            </div>
            <input type="text" value={text} onChange={updateValue} onBlur={stopEdit} disabled={!edit}/>
            <button onClick={toggleEdit}>e</button>
        </div>
    )
}
