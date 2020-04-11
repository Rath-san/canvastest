import React, { useRef, useEffect, useState, useCallback } from 'react';
import { TextInput, inputItem } from './canvas/TextInput';
import { Coordinate } from '../models/canvas';

interface CanvasProps {
    width: number;
    height: number;
    activeTool?: number;
}

const Canvas = ({ width, height, activeTool }: CanvasProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isPainting, setIsPainting] = useState(false);
    const [mousePosition, setMousePosition] = useState<Coordinate | undefined>(undefined);

    const [isTyping, setIsTyping] = useState(false);
    const [typingPoints, setTypingPoints] = useState<inputItem[] | []>([]);

    const startType = useCallback((event: MouseEvent) => {
        const coordinates = getCoordinates(event);
        if (coordinates) {
            setIsTyping(true);
            setMousePosition(coordinates);
        }
    }, []);

    const getCoordinates = (event: MouseEvent): Coordinate | undefined => {
        if (!canvasRef.current) {
            return;
        }

        const canvas: HTMLCanvasElement = canvasRef.current;
        return { x: event.pageX - canvas.offsetLeft, y: event.pageY - canvas.offsetTop };
    };

    const spawnInput = useCallback((event: MouseEvent) => {
        setTypingPoints(prevState => ([...prevState, {
            id: `${Math.random()}`,
            text: 'string',
            coordinate: getCoordinates(event),
            edit: false
        }]))
    }, []);

    useEffect(() => {
        if (!canvasRef.current) {
            return;
        }
        const canvas: HTMLCanvasElement = canvasRef.current;
        canvas.addEventListener('mousedown', spawnInput);
        return () => {
            canvas.removeEventListener('mousedown', spawnInput);
        };
    }, [spawnInput]);

    // const paint = useCallback(
    //     (event: MouseEvent) => {
    //         const newMousePosition = getCoordinates(event);
    //         if (isPainting) {
    //             if (mousePosition && newMousePosition) {
    //                 drawLine(mousePosition, newMousePosition);
    //             }
    //         }
    //         if (isTyping) {
    //             // if (newMousePosition) {
    //                 spawnInput();
    //             // }
    //         }
    //         setMousePosition(newMousePosition);
    //     },
    //     [isTyping, mousePosition]
    // );

    // ...other stuff here

    // const drawLine = (originalMousePosition: Coordinate, newMousePosition: Coordinate) => {
    //     if (!canvasRef.current) {
    //         return;
    //     }
    //     const canvas: HTMLCanvasElement = canvasRef.current;
    //     const context = canvas.getContext('2d');
    //     if (context) {
    //         context.strokeStyle = 'red';
    //         context.lineJoin = 'round';
    //         context.lineWidth = 5;

    //         context.beginPath();
    //         context.moveTo(originalMousePosition.x, originalMousePosition.y);
    //         context.lineTo(newMousePosition.x, newMousePosition.y);
    //         context.closePath();

    //         context.stroke();
    //     }
    // };

    useEffect(() => {
        if (!canvasRef.current) {
            return;
        }
        const canvas: HTMLCanvasElement = canvasRef.current;
        canvas.addEventListener('mousemove', paint);
        return () => {
            canvas.removeEventListener('mousemove', paint);
        };
    }, [paint]);

    // const exitPaint = useCallback(() => {
    //     setIsPainting(false);
    //     setMousePosition(undefined);
    // }, []);

    useEffect(() => {
        if (!canvasRef.current) {
            return;
        }
        const canvas: HTMLCanvasElement = canvasRef.current;
        canvas.addEventListener('mouseup', exitPaint);
        canvas.addEventListener('mouseleave', exitPaint);
        return () => {
            canvas.removeEventListener('mouseup', exitPaint);
            canvas.removeEventListener('mouseleave', exitPaint);
        };
    }, [exitPaint]);

    

    return (
        <div className='canvas-wrapper' style={{position: `relative`}}>
            {(typingPoints as inputItem[]).map((inputItem) => (
                // <div
                //     key={id}
                //     style={{
                //         position: `absolute`,
                //         top: coordinate?.y,
                //         left: coordinate?.x
                //     }}
                // >
                //     <input type="text" value={text}/>
                // </div>
                <TextInput {...inputItem} key={inputItem.id}/>
            ))}
            <canvas ref={canvasRef} height={height} width={width} />
        </div>
    );
};

Canvas.defaultProps = {
    width: window.innerWidth,
    height: window.innerHeight,
};

export default Canvas;
