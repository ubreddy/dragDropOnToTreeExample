// import { getIndexAmongSiblings } from './utils/path'
// import { flattenTree } from './utils/tree'
// import { getDestinationPath } from './utils/flat-tree'
export const complexTree = {
    "rootId": "1",
    "items":
    {
        "1": {
            "id": "1",
            "children": ["1-0", "1-1", "1-2", "1-3", "1-4", "1-5", "1-6", "1-7", "1-8"],
            "hasChildren": true,
            "isExpanded": true,
            "isChildrenLoading": false,
            "data": { "title": "Title 1" }
        },
        "1-0": {
            "id": "1-0",
            "children": [],
            "hasChildren": false,
            "isExpanded": false,
            "isChildrenLoading": false,
            "data": { "title": "Title 1-0" }
        },
        "1-1": {
            "id": "1-1",
            "children": [],
            "hasChildren": false,
            "isExpanded": false,
            "isChildrenLoading": false,
            "data": { "title": "Title 1-1" }
        },
        "1-2": {
            "id": "1-2",
            "children": ["1-2-0", "1-2-1", "1-2-2", "1-2-3"],
            "hasChildren": true,
            "isExpanded": true,
            "isChildrenLoading": false,
            "data": { "title": "Title 2" }
        },
        "1-2-0": {
            "id": "1-2-0",
            "children": [],
            "hasChildren": false,
            "isExpanded": false,
            "isChildrenLoading": false,
            "data": { "title": "Title 2-0" }
        },
        "1-2-1": {
            "id": "1-2-1",
            "children": [],
            "hasChildren": false,
            "isExpanded": false,
            "isChildrenLoading": false,
            "data": { "title": "Title 2-1" }
        },
        "1-2-2": {
            "id": "1-2-2",
            "children": [],
            "hasChildren": false,
            "isExpanded": false,
            "isChildrenLoading": false,
            "data": { "title": "Title 2-2" }
        },
        "1-2-3": {
            "id": "1-2-3",
            "children": [],
            "hasChildren": false,
            "isExpanded": false,
            "isChildrenLoading": false,
            "data": { "title": "Title 2-3" }
        },
        "1-3": {
            "id": "1-3",
            "children": [],
            "hasChildren": false,
            "isExpanded": false,
            "isChildrenLoading": false,
            "data": { "title": "Title 1-3" }
        },
        "1-4": {
            "id": "1-4",
            "children": [],
            "hasChildren": false,
            "isExpanded": false,
            "isChildrenLoading": false,
            "data": { "title": "Title 1-4" }
        },
        "1-5": {
            "id": "1-5",
            "children": [],
            "hasChildren": false,
            "isExpanded": false,
            "isChildrenLoading": false,
            "data": { "title": "Title 1-5" }
        },
        "1-6": {
            "id": "1-6",
            "children": ["1-6-0", "1-6-1", "1-6-2", "1-6-3", "1-6-4"],
            "hasChildren": true,
            "isExpanded": true,
            "isChildrenLoading": false,
            "data": { "title": "Title 6" }
        },
        "1-6-0": {
            "id": "1-6-0",
            "children": [],
            "hasChildren": false,
            "isExpanded": false,
            "isChildrenLoading": false,
            "data": { "title": "Title 6-0" }
        },
        "1-6-1": {
            "id": "1-6-1",
            "children": [],
            "hasChildren": false,
            "isExpanded": false,
            "isChildrenLoading": false,
            "data": { "title": "Title 6-1" }
        },
        "1-6-2": {
            "id": "1-6-2",
            "children": ["1-6-2-0", "1-6-2-1", "1-6-2-2"],
            "hasChildren": true,
            "isExpanded": true,
            "isChildrenLoading": false,
            "data": { "title": "Title 2" }
        },
        "1-6-2-0": {
            "id": "1-6-2-0",
            "children": [],
            "hasChildren": false,
            "isExpanded": false,
            "isChildrenLoading": false,
            "data": { "title": "Title 2-0" }
        },
        "1-6-2-1": {
            "id": "1-6-2-1",
            "children": [],
            "hasChildren": false,
            "isExpanded": false,
            "isChildrenLoading": false,
            "data": { "title": "Title 2-1" }
        },
        "1-6-2-2": {
            "id": "1-6-2-2",
            "children": [],
            "hasChildren": false,
            "isExpanded": false,
            "isChildrenLoading": false,
            "data": { "title": "Title 2-2" }
        },
        "1-6-3": {
            "id": "1-6-3",
            "children": [],
            "hasChildren": false,
            "isExpanded": false,
            "isChildrenLoading": false,
            "data": { "title": "Title 6-3" }
        },
        "1-6-4": {
            "id": "1-6-4",
            "children": [],
            "hasChildren": false,
            "isExpanded": false,
            "isChildrenLoading": false,
            "data": { "title": "Title 6-4" }
        },
        "1-7": {
            "id": "1-7",
            "children": [],
            "hasChildren": false,
            "isExpanded": false,
            "isChildrenLoading": false,
            "data": { "title": "Title 1-7" }
        },
        "1-8": {
            "id": "1-8",
            "children": [],
            "hasChildren": false,
            "isExpanded": false,
            "isChildrenLoading": false,
            "data": { "title": "Title 1-8" }
        }
    }
}
// Output of flattenTree(complexTree)
// const flattenedTree = [
//     { "item": { "id": "1-0", "children": [], "hasChildren": false, "isExpanded": false, "isChildrenLoading": false, "data": { "title": "Title 1-0" } }, "path": [0] },
//     { "item": { "id": "1-1", "children": [], "hasChildren": false, "isExpanded": false, "isChildrenLoading": false, "data": { "title": "Title 1-1" } }, "path": [1] },
//     { "item": { "id": "1-2", "children": ["1-2-0", "1-2-1", "1-2-2", "1-2-3"], "hasChildren": true, "isExpanded": true, "isChildrenLoading": false, "data": { "title": "Title 2" } }, "path": [2] },
//     { "item": { "id": "1-2-0", "children": [], "hasChildren": false, "isExpanded": false, "isChildrenLoading": false, "data": { "title": "Title 2-0" } }, "path": [2, 0] },
//     { "item": { "id": "1-2-1", "children": [], "hasChildren": false, "isExpanded": false, "isChildrenLoading": false, "data": { "title": "Title 2-1" } }, "path": [2, 1] },
//     { "item": { "id": "1-2-2", "children": [], "hasChildren": false, "isExpanded": false, "isChildrenLoading": false, "data": { "title": "Title 2-2" } }, "path": [2, 2] },
//     { "item": { "id": "1-2-3", "children": [], "hasChildren": false, "isExpanded": false, "isChildrenLoading": false, "data": { "title": "Title 2-3" } }, "path": [2, 3] },
//     { "item": { "id": "1-3", "children": [], "hasChildren": false, "isExpanded": false, "isChildrenLoading": false, "data": { "title": "Title 1-3" } }, "path": [3] },
//     { "item": { "id": "1-4", "children": [], "hasChildren": false, "isExpanded": false, "isChildrenLoading": false, "data": { "title": "Title 1-4" } }, "path": [4] },
//     { "item": { "id": "1-5", "children": [], "hasChildren": false, "isExpanded": false, "isChildrenLoading": false, "data": { "title": "Title 1-5" } }, "path": [5] },
//     { "item": { "id": "1-6", "children": ["1-6-0", "1-6-1", "1-6-2", "1-6-3", "1-6-4"], "hasChildren": true, "isExpanded": true, "isChildrenLoading": false, "data": { "title": "Title 6" } }, "path": [6] },
//     { "item": { "id": "1-6-0", "children": [], "hasChildren": false, "isExpanded": false, "isChildrenLoading": false, "data": { "title": "Title 6-0" } }, "path": [6, 0] },
//     { "item": { "id": "1-6-1", "children": [], "hasChildren": false, "isExpanded": false, "isChildrenLoading": false, "data": { "title": "Title 6-1" } }, "path": [6, 1] },
//     { "item": { "id": "1-6-2", "children": ["1-6-2-0", "1-6-2-1", "1-6-2-2"], "hasChildren": true, "isExpanded": true, "isChildrenLoading": false, "data": { "title": "Title 2" } }, "path": [6, 2] },
//     { "item": { "id": "1-6-2-0", "children": [], "hasChildren": false, "isExpanded": false, "isChildrenLoading": false, "data": { "title": "Title 2-0" } }, "path": [6, 2, 0] },
//     { "item": { "id": "1-6-2-1", "children": [], "hasChildren": false, "isExpanded": false, "isChildrenLoading": false, "data": { "title": "Title 2-1" } }, "path": [6, 2, 1] },
//     { "item": { "id": "1-6-2-2", "children": [], "hasChildren": false, "isExpanded": false, "isChildrenLoading": false, "data": { "title": "Title 2-2" } }, "path": [6, 2, 2] },
//     { "item": { "id": "1-6-3", "children": [], "hasChildren": false, "isExpanded": false, "isChildrenLoading": false, "data": { "title": "Title 6-3" } }, "path": [6, 3] },
//     { "item": { "id": "1-6-4", "children": [], "hasChildren": false, "isExpanded": false, "isChildrenLoading": false, "data": { "title": "Title 6-4" } }, "path": [6, 4] },
//     { "item": { "id": "1-7", "children": [], "hasChildren": false, "isExpanded": false, "isChildrenLoading": false, "data": { "title": "Title 1-7" } }, "path": [7] },
//     { "item": { "id": "1-8", "children": [], "hasChildren": false, "isExpanded": false, "isChildrenLoading": false, "data": { "title": "Title 1-8" } }, "path": [8] }]

// console.log(JSON.stringify(getDestinationPath(flattenedTree, 8, 7)))