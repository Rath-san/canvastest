export const getCoordinates = (event: MouseEvent, canvasRef: React.RefObject<HTMLCanvasElement>) => {
    if (!canvasRef.current) {
        return;
    }

    const canvas: HTMLCanvasElement = canvasRef.current;
    return { x: event.pageX - canvas.offsetLeft, y: event.pageY - canvas.offsetTop };
};
