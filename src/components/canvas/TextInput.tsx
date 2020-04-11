import React, { useState, useRef } from 'react'
import { Coordinate } from '../../models/canvas';
import { useEffect } from 'react';
import { cleanup } from '@testing-library/react';
import { useCallback } from 'react';

export interface inputItem {
    id: string;
    text: string;
    coordinate: Coordinate | undefined;
    edit: boolean;
}

export const TextInput = (props: inputItem) => {

    const {id, coordinate} = props;

    // const [state, setState] = useState({...props})
    const [text, setText] = useState(props.text);
    const [edit, setEdit] = useState(props.edit);
    const [isMoving, setIsMoving] = useState(false);

    const dragControl = useRef(null);

    const moving = useCallback(() => {
            
        },
        [],
    )

    useEffect(() => {
        
        return () => {
            // cleanup
        }
    }, [moving])

    const toggleEdit = () => {
        setEdit(!edit);
    }

    const updateValue = ({target: {value}}: React.ChangeEvent<HTMLInputElement>) => {
        setText(value)
    }

    const stopEdit = () => {
        setEdit(false);
    }

    return (
        <div 
            style={{
                position: `absolute`,
                top: coordinate?.y,
                left: coordinate?.x
            }}
        >
            <div className="drag-control" ref={dragControl} style={{display: `inline-block`, cursor: `move`}}>
                <i style={{padding: `1rem`}}>i</i>
            </div>
            <input type="text" value={text} onChange={updateValue} onBlur={stopEdit} disabled={!edit}/>
            <button onClick={toggleEdit}>e</button>
        </div>
    )
}
