import React, { Component } from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { getBox } from 'css-box-model';
// import { calculateFinalDropPositions } from '../utils/Tree-utils';
import { noop } from '../utils/handy';
import { flattenTree, mutateTree } from '../utils/tree';
import TreeItem from './TreeItem';
// import { getDestinationPath, getItemById, getIndexById, } from '../utils/flat-tree';
import { getDestinationPath, getIndexById, } from '../utils/flat-tree';
import DelayedFunction from '../utils/delayed-function';
export default class Tree extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            flattenedTree: [],
            draggedItemId: undefined,
        };
        // HTMLElement for each rendered item
        this.itemsElement = {};
        this.expandTimer = new DelayedFunction(500);
        // this.onDragStart = (result) => {
        //     const { onDragStart } = this.props;
        //     this.dragState = {
        //         source: result.source,
        //         destination: result.source,
        //         mode: result.mode,
        //     };
        //     this.setState({
        //         draggedItemId: result.draggableId,
        //     });
        //     if (onDragStart) {
        //         onDragStart(result.draggableId);
        //     }
        // };
        // this.onDragUpdate = (update) => {
        //     const { onExpand } = this.props;
        //     const { flattenedTree } = this.state;
        //     if (!this.dragState) {
        //         return;
        //     }
        //     this.expandTimer.stop();
        //     if (update.combine) {
        //         const { draggableId } = update.combine;
        //         const item = getItemById(flattenedTree, draggableId);
        //         if (item && this.isExpandable(item)) {
        //             this.expandTimer.start(() => onExpand(draggableId, item.path));
        //         }
        //     }
        //     this.dragState = {
        //         ...this.dragState,
        //         destination: update.destination,
        //         combine: update.combine,
        //     };
        // };
        // this.onDragEnd = (result) => {
        //     const { onDragEnd, tree } = this.props;
        //     const { flattenedTree } = this.state;
        //     this.expandTimer.stop();
        //     const finalDragState = {
        //         ...this.dragState,
        //         source: result.source,
        //         destination: result.destination,
        //         combine: result.combine,
        //     };
        //     this.setState({
        //         draggedItemId: undefined,
        //     });
        //     const { sourcePosition, destinationPosition } = calculateFinalDropPositions(tree, flattenedTree, finalDragState);
        //     onDragEnd(sourcePosition, destinationPosition);
        //     this.dragState = undefined;
        // };
        this.onDropAnimating = () => {
            this.expandTimer.stop();
        };
        this.onPointerMove = () => {
            if (this.dragState) {
                this.dragState = {
                    ...this.dragState,
                    horizontalLevel: this.getDroppedLevel(),
                };
            }
        };
        this.calculateEffectivePath = (flatItem, snapshot) => {
            const { flattenedTree, draggedItemId } = this.state;
            if (this.dragState &&
                draggedItemId === flatItem.item.id &&
                (this.dragState.destination || this.dragState.combine)) {
                const { source, destination, combine, horizontalLevel, mode, } = this.dragState;
                // We only update the path when it's dragged by keyboard or drop is animated
                if (source.droppableId === this.droppableId && (mode === 'SNAP' || snapshot.isDropAnimating)) {
                    if (destination) {
                        // Between two items
                        return getDestinationPath(flattenedTree, source.index, destination.index, horizontalLevel);
                    }
                    if (combine) {
                        // Hover on other item while dragging
                        return getDestinationPath(flattenedTree, source.index, getIndexById(flattenedTree, combine.draggableId), horizontalLevel);
                    }
                }
            }
            return flatItem.path;
        };
        this.isExpandable = (item) => !!item.item.hasChildren && !item.item.isExpanded;
        this.getDroppedLevel = () => {
            const { offsetPerLevel } = this.props;
            const { draggedItemId } = this.state;
            if (!this.dragState || !this.containerElement) {
                return undefined;
            }
            const containerLeft = getBox(this.containerElement).contentBox.left;
            const itemElement = this.itemsElement[draggedItemId];
            if (itemElement) {
                const currentLeft = getBox(itemElement).contentBox.left;
                const relativeLeft = Math.max(currentLeft - containerLeft, 0);
                return (Math.floor((relativeLeft + offsetPerLevel / 2) / offsetPerLevel) + 1);
            }
            return undefined;
        };
        this.patchDroppableProvided = (provided) => {
            return {
                ...provided,
                innerRef: (el) => {
                    this.containerElement = el;
                    provided.innerRef(el);
                },
            };
        };
        this.setItemRef = (itemId, el) => {
            if (!!el) {
                this.itemsElement[itemId] = el;
            }
        };
        this.renderItems = () => {
            const { flattenedTree } = this.state;
            return flattenedTree.map(this.renderItem);
        };
        this.renderItem = (flatItem, index) => {
            const { isDragEnabled } = this.props;
            return (
                <Draggable key={flatItem.item.id} draggableId={flatItem.item.id.toString()} index={index} isDragDisabled={!isDragEnabled}>
                    {this.renderDraggableItem(flatItem)}
                </Draggable>
            )

            // React.createElement(Draggable, { key: flatItem.item.id, draggableId: flatItem.item.id.toString(), index: index, isDragDisabled: !isDragEnabled }, this.renderDraggableItem(flatItem)));
        }
        this.renderDraggableItem = (flatItem) => (provided, snapshot) => {
            const { renderItem, onExpand, onCollapse, offsetPerLevel } = this.props;
            const currentPath = this.calculateEffectivePath(flatItem, snapshot);
            if (snapshot.isDropAnimating) {
                this.onDropAnimating();
            }
            return (
                <TreeItem key={flatItem.item.id} item={flatItem.item} path={currentPath} onExpand={onExpand} onCollapse={onCollapse} renderItem={renderItem} provided={provided} snapshot={snapshot} itemRef={this.setItemRef} offsetPerLevel={offsetPerLevel} />
                // React.createElement(TreeItem, { key: flatItem.item.id, item: flatItem.item, path: currentPath, onExpand: onExpand, onCollapse: onCollapse, renderItem: renderItem, provided: provided, snapshot: snapshot, itemRef: this.setItemRef, offsetPerLevel: offsetPerLevel }));
            )
        };
    }
    static getDerivedStateFromProps(props, state) {
        const { draggedItemId } = state;
        const { tree } = props;
        const finalTree = Tree.closeParentIfNeeded(tree, draggedItemId);
        const flattenedTree = flattenTree(finalTree);
        const id = props.id && props.id.includes('tree') ? props.id : `tree--${props.id || ''}`
        return {
            ...state,
            droppableId: state.droppableId || id,
            flattenedTree,
        };
    }
    static closeParentIfNeeded(tree, draggedItemId) {
        if (!!draggedItemId) {
            // Closing parent internally during dragging, because visually we can only move one item not a subtree
            return mutateTree(tree, draggedItemId, {
                isExpanded: false,
            });
        }
        return tree;
    }
    render() {
        const { isNestingEnabled, id } = this.props;
        const renderedItems = this.renderItems();
        return (
            <Droppable droppableId={id && id.includes('tree') ? id : `tree--${id || ''}`} isCombineEnabled={isNestingEnabled} ignoreContainerClipping={true} type="item">
                {(provided) => {
                    const finalProvided = this.patchDroppableProvided(provided)
                    return (<div ref={finalProvided.innerRef} style={{ pointerEvents: 'auto' }} onTouchMove={this.onPointerMove} onMouseMove={this.onPointerMove} {...finalProvided.droppableProps}>
                        {renderedItems}
                        {provided.placeholder}
                    </div>
                    )
                }
                }
            </Droppable>
        )
    }
}
Tree.defaultProps = {
    tree: { children: [] },
    onExpand: noop,
    onCollapse: noop,
    onDragStart: noop,
    onDragEnd: noop,
    renderItem: noop,
    offsetPerLevel: 35,
    isDragEnabled: false,
    isNestingEnabled: false,
};
