// Colors are rendered in order received by the server
// and the color ID is not in order. This maps id to index.
export function color_id_to_index(colors, colorID) {
    colorID = parseInt(colorID)
    return colors.map(function(color) { return color.ID; }).indexOf(colorID);
}