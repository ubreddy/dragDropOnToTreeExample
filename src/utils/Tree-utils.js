import { getTreePosition } from './tree';
import { getDestinationPath, getSourcePath } from './flat-tree';
/*
    Translates a drag&drop movement from an index based position to a relative (parent, index) position
*/
export const calculateFinalDropPositions = (tree, flattenedTree, dragState) => {
    const { source, destination, combine, horizontalLevel } = dragState;
    const sourcePath = getSourcePath(flattenedTree, source.index);
    const sourcePosition = getTreePosition(tree, sourcePath);
    if (sourcePosition && combine) {
        return {
            sourcePosition,
            destinationPosition: {
                parentId: combine.draggableId,
            },
        };
    }
    if (!destination) {
        return { sourcePosition, destinationPosition: undefined };
    }

    let sourceIndex = destination.index;
    if(sourcePosition) {
        sourceIndex = source.index;
    }

    const destinationPath = getDestinationPath(flattenedTree, sourceIndex, destination.index, horizontalLevel);
    const destinationPosition = {
        ...getTreePosition(tree, destinationPath),
    };
    return { sourcePosition, destinationPosition };
};
//# sourceMappingURL=Tree-utils.js.map