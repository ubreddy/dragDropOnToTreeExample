import { getParentPath, getIndexAmongSiblings } from './path';
/*
  Transforms tree structure into flat list of items for rendering purposes.
  We recursively go through all the elements and its children first on each level
 */
/** 
x = {
    "rootId": "1",
    "items":
    {
        "1": {"id": "1", "hasChildren": true, "isExpanded": true, "isChildrenLoading": false, "data": { "title": "Title 1" },
            "children": ["1-0", "1-1", "1-2", "1-3", "1-4", "1-5", "1-6", "1-7", "1-8"],
        },"1-0": {"id": "1-0", "hasChildren": false, "isExpanded": false, "isChildrenLoading": false, "data": { "title": "Title 1-0" },
            "children": []
        },"1-1": {"id": "1-1", "children": [], "hasChildren": false, "isExpanded": false, "isChildrenLoading": false, "data": { "title": "Title 1-1" }
        },"1-2": {"id": "1-2", "hasChildren": true, "isExpanded": true, "isChildrenLoading": false, "data": { "title": "Title 2" },
            "children": ["1-2-0", "1-2-1", "1-2-2", "1-2-3"],
        },"1-2-0": {"id": "1-2-0", "children": [], "hasChildren": false, "isExpanded": false, "isChildrenLoading": false, "data": { "title": "Title 2-0" }
        },"1-2-1": {"id": "1-2-1", "children": [], "hasChildren": false, "isExpanded": false, "isChildrenLoading": false, "data": { "title": "Title 2-1" }
        },"1-2-2": {"id": "1-2-2", "children": [], "hasChildren": false, "isExpanded": false, "isChildrenLoading": false, "data": { "title": "Title 2-2" }
        },"1-2-3": {"id": "1-2-3", "children": [], "hasChildren": false, "isExpanded": false, "isChildrenLoading": false, "data": { "title": "Title 2-3" }
        },"1-3": {"id": "1-3", "children": [], "hasChildren": false, "isExpanded": false, "isChildrenLoading": false, "data": { "title": "Title 1-3" }
        },"1-4": {"id": "1-4", "children": [], "hasChildren": false, "isExpanded": false, "isChildrenLoading": false, "data": { "title": "Title 1-4" }
        },"1-5": {"id": "1-5", "children": [], "hasChildren": false, "isExpanded": false, "isChildrenLoading": false, "data": { "title": "Title 1-5" }
        },"1-6": {"id": "1-6", "hasChildren": true, "isExpanded": true, "isChildrenLoading": false, "data": { "title": "Title 6" },
            "children": ["1-6-0", "1-6-1", "1-6-2", "1-6-3", "1-6-4"]
        },"1-6-0": {"id": "1-6-0", "children": [], "hasChildren": false, "isExpanded": false, "isChildrenLoading": false, "data": { "title": "Title 6-0" }
        },"1-6-1": {"id": "1-6-1", "children": [], "hasChildren": false, "isExpanded": false, "isChildrenLoading": false, "data": { "title": "Title 6-1" }
        },"1-6-2": {"id": "1-6-2", "hasChildren": true, "isExpanded": true, "isChildrenLoading": false, "data": { "title": "Title 2" },
            "children": ["1-6-2-0", "1-6-2-1", "1-6-2-2"],
        },"1-6-2-0": {"id": "1-6-2-0", "children": [], "hasChildren": false, "isExpanded": false, "isChildrenLoading": false, "data": { "title": "Title 2-0" }
        },"1-6-2-1": {"id": "1-6-2-1", "children": [], "hasChildren": false, "isExpanded": false, "isChildrenLoading": false, "data": { "title": "Title 2-1" }
        },"1-6-2-2": {"id": "1-6-2-2", "children": [], "hasChildren": false, "isExpanded": false, "isChildrenLoading": false, "data": { "title": "Title 2-2" }
        },"1-6-3": {"id": "1-6-3", "children": [], "hasChildren": false, "isExpanded": false, "isChildrenLoading": false, "data": { "title": "Title 6-3" }
        },"1-6-4": {"id": "1-6-4", "children": [], "hasChildren": false, "isExpanded": false, "isChildrenLoading": false, "data": { "title": "Title 6-4" }
        },"1-7": {"id": "1-7", "children": [], "hasChildren": false, "isExpanded": false, "isChildrenLoading": false, "data": { "title": "Title 1-7" }
        },"1-8": {"id": "1-8", "children": [], "hasChildren": false, "isExpanded": false, "isChildrenLoading": false, "data": { "title": "Title 1-8" }
        }
    }
}
const flattenedTree = [
    { "item": { "id": "1-0", "children": [], "hasChildren": false, "isExpanded": false, "isChildrenLoading": false, "data": { "title": "Title 1-0" } }, "path": [0] },
    { "item": { "id": "1-1", "children": [], "hasChildren": false, "isExpanded": false, "isChildrenLoading": false, "data": { "title": "Title 1-1" } }, "path": [1] },
    { "item": { "id": "1-2", "children": ["1-2-0", "1-2-1", "1-2-2", "1-2-3"], "hasChildren": true, "isExpanded": true, "isChildrenLoading": false, "data": { "title": "Title 2" } }, "path": [2] },
    { "item": { "id": "1-2-0", "children": [], "hasChildren": false, "isExpanded": false, "isChildrenLoading": false, "data": { "title": "Title 2-0" } }, "path": [2, 0] },
    { "item": { "id": "1-2-1", "children": [], "hasChildren": false, "isExpanded": false, "isChildrenLoading": false, "data": { "title": "Title 2-1" } }, "path": [2, 1] },
    { "item": { "id": "1-2-2", "children": [], "hasChildren": false, "isExpanded": false, "isChildrenLoading": false, "data": { "title": "Title 2-2" } }, "path": [2, 2] },
    { "item": { "id": "1-2-3", "children": [], "hasChildren": false, "isExpanded": false, "isChildrenLoading": false, "data": { "title": "Title 2-3" } }, "path": [2, 3] },
    { "item": { "id": "1-3", "children": [], "hasChildren": false, "isExpanded": false, "isChildrenLoading": false, "data": { "title": "Title 1-3" } }, "path": [3] },
    { "item": { "id": "1-4", "children": [], "hasChildren": false, "isExpanded": false, "isChildrenLoading": false, "data": { "title": "Title 1-4" } }, "path": [4] },
    { "item": { "id": "1-5", "children": [], "hasChildren": false, "isExpanded": false, "isChildrenLoading": false, "data": { "title": "Title 1-5" } }, "path": [5] },
    { "item": { "id": "1-6", "children": ["1-6-0", "1-6-1", "1-6-2", "1-6-3", "1-6-4"], "hasChildren": true, "isExpanded": true, "isChildrenLoading": false, "data": { "title": "Title 6" } }, "path": [6] },
    { "item": { "id": "1-6-0", "children": [], "hasChildren": false, "isExpanded": false, "isChildrenLoading": false, "data": { "title": "Title 6-0" } }, "path": [6, 0] },
    { "item": { "id": "1-6-1", "children": [], "hasChildren": false, "isExpanded": false, "isChildrenLoading": false, "data": { "title": "Title 6-1" } }, "path": [6, 1] },
    { "item": { "id": "1-6-2", "children": ["1-6-2-0", "1-6-2-1", "1-6-2-2"], "hasChildren": true, "isExpanded": true, "isChildrenLoading": false, "data": { "title": "Title 2" } }, "path": [6, 2] },
    { "item": { "id": "1-6-2-0", "children": [], "hasChildren": false, "isExpanded": false, "isChildrenLoading": false, "data": { "title": "Title 2-0" } }, "path": [6, 2, 0] },
    { "item": { "id": "1-6-2-1", "children": [], "hasChildren": false, "isExpanded": false, "isChildrenLoading": false, "data": { "title": "Title 2-1" } }, "path": [6, 2, 1] },
    { "item": { "id": "1-6-2-2", "children": [], "hasChildren": false, "isExpanded": false, "isChildrenLoading": false, "data": { "title": "Title 2-2" } }, "path": [6, 2, 2] },
    { "item": { "id": "1-6-3", "children": [], "hasChildren": false, "isExpanded": false, "isChildrenLoading": false, "data": { "title": "Title 6-3" } }, "path": [6, 3] },
    { "item": { "id": "1-6-4", "children": [], "hasChildren": false, "isExpanded": false, "isChildrenLoading": false, "data": { "title": "Title 6-4" } }, "path": [6, 4] },
    { "item": { "id": "1-7", "children": [], "hasChildren": false, "isExpanded": false, "isChildrenLoading": false, "data": { "title": "Title 1-7" } }, "path": [7] },
    { "item": { "id": "1-8", "children": [], "hasChildren": false, "isExpanded": false, "isChildrenLoading": false, "data": { "title": "Title 1-8" } }, "path": [8] }]
    * 
 */
// flattens the children into an array pre,c-children, post order  dfs
export const flattenTree = (tree, path = []) => tree.items[tree.rootId]
    ? tree.items[tree.rootId].children.reduce((accum, itemId, index) => {
        // iterating through all the children on the given level
        const item = tree.items[itemId];
        const currentPath = [...path, index];
        // we create a flattened item for the current item
        const currentItem = createFlattenedItem(item, currentPath);
        // we flatten its children
        const children = flattenChildren(tree, item, currentPath);
        // append to the accumulator
        return [...accum, currentItem, ...children];
    }, [])
    : [];
/*
  Constructs a new FlattenedItem  ie. appended the path array.
 */
const createFlattenedItem = (item, currentPath) => {
    return {
        item,
        path: currentPath,
    };
};
/*
  Flatten the children of the given subtree
*/
const flattenChildren = (tree, item, currentPath) => {
    return item.isExpanded
        ? flattenTree({ rootId: item.id, items: tree.items }, currentPath)
        : [];
};
/*
  Return a shallow copy of the given tree
 */
export const copyTree = (tree) => {
    return {
        rootId: tree.rootId,
        items: { ...tree.items }
    };
}
/*
  Changes the tree data structure with minimal reference changes.
 */
export const mutateTree = (tree, itemId, mutation) => {
    const itemToChange = tree.items[itemId];
    if (!itemToChange) {
        // Item not found
        return tree;
    }
    // Returning a clone of the tree structure and overwriting the field coming in mutation
    let clonedTree = copyTree(tree);
    clonedTree.items[itemId] = {
        ...itemToChange,
        ...mutation,
    };
    return clonedTree;
};
export const getItem = (tree, path) => {
    let cursor = tree.items[tree.rootId];
    for (const i of path) {
        cursor = tree.items[cursor.children[i]];
    }
    return cursor;
};
export const getParent = (tree, path) => {
    const parentPath = getParentPath(path);
    return getItem(tree, parentPath);
};
export const getTreePosition = (tree, path) => {
    if(!path) {
        return null;
    }
    const parent = getParent(tree, path);
    const index = getIndexAmongSiblings(path);
    return {
        parentId: parent.id,
        index,
    };
};
const hasLoadedChildren = (item) => !!item.hasChildren && item.children.length > 0;
const isLeafItem = (item) => !item.hasChildren;
const removeItemFromTree = (tree, position) => {
    const sourceParent = tree.items[position.parentId];
    const newSourceChildren = [...sourceParent.children];
    const itemRemoved = newSourceChildren.splice(position.index, 1)[0];
    const newTree = mutateTree(tree, position.parentId, {
        children: newSourceChildren,
        hasChildren: newSourceChildren.length > 0,
        isExpanded: newSourceChildren.length > 0 && sourceParent.isExpanded,
    });
    return {
        tree: newTree,
        itemRemoved,
    };
};
export const addItemToTree = (tree, position, item) => {
    const destinationParent = tree.items[position.parentId];
    const newDestinationChildren = [...destinationParent.children];
    if (typeof position.index === 'undefined') {
        if (hasLoadedChildren(destinationParent) || isLeafItem(destinationParent)) {
            newDestinationChildren.push(item);
        }
    }
    else {
        newDestinationChildren.splice(position.index, 0, item);
    }
    return mutateTree(tree, position.parentId, {
        children: newDestinationChildren,
        hasChildren: true,
    });
};
export const moveItemOnTree = (tree, from, to) => {
    const { tree: treeWithoutSource, itemRemoved } = removeItemFromTree(tree, from);
    return addItemToTree(treeWithoutSource, to, itemRemoved);
};
