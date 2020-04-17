import * as Concrete from '../libs/concrete'
import React, { useRef, useEffect, useState, useCallback } from 'react';
import imageSrc from '../data/english-test-class-6-tests_117281_1.jpg'
import { inputItem, TextInput } from './canvas/TextInput';
import { ToolNumeric } from '../models/tools';

interface CanvasProps {
    width: number;
    height: number;
    activeTool: ToolNumeric;
}

type Coordinate = {
    x: number;
    y: number;
};

const CanvasDraw = ({ width, height, activeTool }: CanvasProps) => {

    const canvasInitialState: { width: number; height: number } = {
        width,
        height
    }

    const [canvas, setCanvas] = useState(canvasInitialState)

    useEffect(() => {
        setCanvas(prevState => ({...prevState, activeTool}));
    }, [activeTool])

    const divRef = useRef<HTMLDivElement>(null);
    const [isPainting, setIsPainting] = useState(false);
    const [mousePosition, setMousePosition] = useState<Coordinate | undefined>(undefined);

    const [viewport, setViewport] = useState<any>(null);
    // console.log(mainlayer);
    const mainlayerRef = useRef(new Concrete.Layer({}));
    const mainlayer = mainlayerRef.current;

    const imageLayerRef = useRef(new Concrete.Layer({}));
    const imageLayer = imageLayerRef.current;

    const [imageLoaded, setImageLoaded] = useState<any>(null);

    const loadImage = useCallback(() => {
        const base_image = new Image();
        base_image.src = imageSrc;

        base_image.onload = function () {

            setImageLoaded(base_image);
            console.log(base_image);

            const vp = new Concrete.Viewport({
                container: divRef.current as {},
                height: base_image.height,
                width
            })
                .add(imageLayer)
                .add(mainlayer);
            setViewport(vp);
        }
    }, [imageLayer, mainlayer, width])

    useEffect(() => {
        loadImage()
    }, []);

    const renderViewport = useCallback(() => {
        if (viewport) {

            imageLayer.scene.context.drawImage(imageLoaded, 0, 0)

            setTimeout(() => {
                viewport.render()
            });
        }
    }, [viewport, imageLoaded, imageLayer]);

    useEffect(() => {
        renderViewport();
    }, [renderViewport]);


    const getCoordinates = (event: MouseEvent) => {

        const canvas: any = divRef.current;
        return { x: event.pageX - canvas.offsetLeft, y: event.pageY - canvas.offsetTop };
    };

    const startPaint = useCallback((event: MouseEvent) => {
        const coordinates = getCoordinates(event);
        if (coordinates) {
            setIsPainting(true);
            setMousePosition(coordinates);
        }
    }, []);

    useEffect(() => {
        if (!divRef.current || activeTool > 1) {
            return
        }
        const div: any = divRef.current;

        div.addEventListener('mousedown', startPaint);
        return () => {
            div.removeEventListener('mousedown', startPaint);
        };
    }, [activeTool, canvas, startPaint]);

    const drawLine = useCallback(
        (originalMousePosition: Coordinate, newMousePosition: Coordinate) => {
            const canvas: any = mainlayer.scene as HTMLCanvasElement;
            const context = canvas.context as CanvasRenderingContext2D;

            if (context) {
                
                if (activeTool !== 0) {

                    context.globalCompositeOperation='source-over'
                    
                } else {
                    context.globalCompositeOperation='destination-out'
                }

                context.strokeStyle = 'red';
                context.lineJoin = 'round';
                context.lineWidth = 5;

                context.beginPath();
                context.moveTo(originalMousePosition.x, originalMousePosition.y);
                context.lineTo(newMousePosition.x, newMousePosition.y);
                context.closePath();
                context.stroke();

                viewport.render();
            }
        }, [activeTool, mainlayer.scene, viewport]);

    const paint = useCallback(
        (event: MouseEvent) => {

            if (isPainting) {
                const newMousePosition = getCoordinates(event);
                if (mousePosition && newMousePosition) {
                    drawLine(mousePosition, newMousePosition);
                    setMousePosition(newMousePosition);
                }
            }
        },
        [isPainting, mousePosition, drawLine]
    );

    useEffect(() => {
        const canvas: any = divRef.current;
        canvas.addEventListener('mousemove', paint);
        return () => {
            canvas.removeEventListener('mousemove', paint);
        };
    }, [paint, viewport]);

    const exitPaint = useCallback(() => {

        setIsPainting(false);
        setMousePosition(undefined);
    }, []);

    useEffect(() => {
        const canvas: any = divRef.current;
        canvas.addEventListener('mouseup', exitPaint);
        canvas.addEventListener('mouseleave', exitPaint);
        return () => {
            canvas.removeEventListener('mouseup', exitPaint);
            canvas.removeEventListener('mouseleave', exitPaint);
        };
    }, [exitPaint]);

    // INPUTS
    // const canvasRef = useRef<HTMLCanvasElement>(null);
    const [typingPoints, setTypingPoints] = useState<inputItem[] | []>([]);
    const spawnInput = useCallback((event: MouseEvent) => {
        if ((event.target as HTMLElement)?.tagName as string !== 'CANVAS') {
            return
        }
        setTypingPoints(prevState => ([...prevState, {
            id: `${Math.random()}`,
            text: 'string',
            coordinate: getCoordinates(event),
            edit: false
        }]))
    }, []);

    useEffect(() => {
        if (!divRef.current || activeTool !== 2) {
            return;
        }
        const div: HTMLDivElement = divRef.current;
        div.addEventListener('mousedown', spawnInput);
        return () => {
            div.removeEventListener('mousedown', spawnInput);
        };
    }, [activeTool, spawnInput]);

    return (
        <div ref={divRef} style={{ border: `1px solid blue` }}>
            {(typingPoints as inputItem[]).map((inputItem) => (
                <TextInput {...inputItem} key={inputItem.id} />
            ))}
        </div>
    )
};

CanvasDraw.defaultProps = {
    width: window.innerWidth,
    height: window.innerHeight,
};

export default CanvasDraw;
