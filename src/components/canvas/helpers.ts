export const getCoordinates = (event: React.MouseEvent | React.DragEvent, htmlElement: any) => {
    if (!htmlElement) {
        return;
    }
    return { x: event.pageX - htmlElement.offsetLeft, y: event.pageY - htmlElement.offsetTop };
};
