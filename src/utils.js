// Colors are rendered in order received by the server
// and the color ID is not in order. This maps id to index.
export function colorIdToIndex(colors, colorID) {
    colorID = parseInt(colorID)
    return colors.map(function(color) { return color.ID; }).indexOf(colorID);
}

// Returne boolean whether mouse is inside canvas or not.
// Assumes canvas starts at 0,0 and ends at canvasWidth, canvasHeight.
export function isMouseInsideCanvas(mousePositionX, mousePositionY, canvasWidth, canvasHeight) {
    if (mousePositionX >= 0 && mousePositionY >= 0 &&
        mousePositionX <= canvasWidth, mousePositionY <= canvasHeight) return true;
    return false;
}