import React, { Component } from 'react';
import NodeHeader from './NodeHeader'
import Drawer from './Drawer'
import styled from 'styled-components'
import { Draggable, Droppable } from 'react-beautiful-dnd';
const Container = styled.div`  
  max-height: 300px;
  background-color: ${props =>
        props.isDraggingOver ? 'lightgrey' : 'inherit'};
`;



const Item = styled.div`
//   border: 1px solid lightgrey;
  border-radius: 5px;
  padding: 4px;
  
  margin-bottom: 2px;
//   box-shadow: 0 3.2px 7.2px 0 rgba(0,0,0,.18), 0 0.6px 1.8px 0 rgba(0,0,0,.11);
  background-color: ${props => (props.isDragging ? 'lightgreen' : 'inherit')};
  font-size: 0.75rem;
`
class LeafItem extends React.Component {
    constructor(props) {
        super(props)
        this.id = (props.item && props.item.name) || props.item.id
    }

    render() {
        // const { item, index, parentId } = this.props;
        const { item, parentId } = this.props;
        // const name = item.name || item.id
        const id = parentId ? `${parentId}--${item.name}` : item.name
        return (
            <Draggable draggableId={id} index={this.props.index}>
                {(provided, snapshot) => (

                    <Item  {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                        isDragging={snapshot.isDragging}
                        index={this.props.index}
                    ><p>{item && item.text}</p></Item>
                )
                }
            </Draggable>

        )

    }
}



export default class TreeNode extends Component {
    constructor(props) {
        super(props)
        this.state = { ...props }
        this.renderItems = this.renderItems.bind(this)
        this.onClick = this.onClick.bind(this)
    }
    onClick() {
        this.setState({ ...this.state, node: { ...this.state.node, toggled: !this.state.node.toggled } })
    }
    renderItems(provided) {
        let { node: { children, name }, parentIndex } = this.state
        let getItem = this.props.getItem
        let childArray = children && children.pop && children
        childArray = childArray || Object.keys(children)
        return (
            <div>
                {
                    childArray && childArray.map((i, k) => {
                        let item = (getItem && getItem(i)) || children[i] || i
                        if (item && !item.children) {
                            // console.log(`index = ${parentIndex * 100 + k}`)
                            return (
                                <LeafItem key={k} item={{ ...item, text: item.label || item.name }} index={parentIndex * 100 + k} parentId={name} />
                            )
                        }
                        else if (item && item.children)
                            return (
                                <TreeNode key={k} node={item} parentIndex={parentIndex * 100 + k} getItem={getItem} />
                            )
                        else
                            return (<p> Something went wrong! item {JSON.stringify(i)} is not found! </p>)
                    })
                }
                {provided.placeholder}
            </div>
        )
    }

    render() {

        const { node, nodeName } = this.state


        return (
            <Droppable
                droppableId={nodeName || node.name}
                type="item"

            >
                {(provided, snapshot) => (
                    <Container
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        isDraggingOver={snapshot.isDraggingOver}
                    >

                        {/* <Draggable draggableId={node.name} index={this.props.index || 0}>
                            {(provided1, snapshot1) => ( */}

                        <NodeHeader
                            // {...provided1.draggableProps}
                            // {...provided1.dragHandleProps}
                            // ref={provided1.innerRef}
                            // isDragging={snapshot1.isDragging}
                            index={this.props.index}
                            node={{ name: node.name, children: node.children, toggled: node.toggled }}

                            onClick={() => this.onClick()}
                        // onSelect={isFunction(onSelect) ? (() => onSelect(node)) : undefined}

                        />
                        {/* //     )
                        //     }
                        // </Draggable> */}
                        <div className="ml-2">
                            <Drawer restAnimationInfo={{
                                enter: {
                                    animation: 'slideDown',
                                    duration: 300
                                },
                                leave: {
                                    animation: 'slideUp',
                                    duration: 300
                                }
                            }} >
                                {node.toggled ? this.renderItems(provided) : null}
                            </Drawer>
                        </div>

                        {provided.placeholder}
                    </Container>
                )}
            </Droppable>

        )

    }
}