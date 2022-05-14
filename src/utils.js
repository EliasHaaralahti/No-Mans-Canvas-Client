// Colors are rendered in order received by the server
// and the color ID is not in order. This maps id to index.
export const colorIdToIndex = (colors, colorID) => {
    colorID = parseInt(colorID)
    return colors.map(function(color) { return color.ID; }).indexOf(colorID);
}
  
export function rgbToHex(r, g, b) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}
  
export function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}