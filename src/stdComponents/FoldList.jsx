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

/**
 * At all lists ... expand all, collapse all.
 * List Component...
  icon
  searchable... scrollable
  fixed maxheight when exanded
  
 options: add
 item: 
   label/name/desc/title/... icon if any if not use list icon.
   options: add/delete/clone/edit/ view option on card, slot
 namespace:
   name
   add item/ remove namespace from selection.. will remove from page...
 
   card edit modal will allow for slot look

 * 
 */


const Item = styled.div`
  border: 1px solid lightgrey;
  border-radius: 5px;
  padding: 4px;
  
  margin-bottom: 2px;
  box-shadow: 0 3.2px 7.2px 0 rgba(0,0,0,.18), 0 0.6px 1.8px 0 rgba(0,0,0,.11);
  background-color: ${props => (props.isDragging ? 'lightgreen' : 'white')};
  font-size: 0.75rem;
`

class ListItem extends React.Component {

    render() {
        const { item, index, parent } = this.props;
        const id = parent ? `${parent}--${item.name}` : item.name
        return (
            <Draggable draggableId={id} index={this.props.index}>
                {(provided, snapshot) => (
                    <React.Fragment>
                        <Item
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                            isDragging={snapshot.isDragging}
                            index={index}>
                                <p>{item && item.text}</p>
                        </Item>
                        {snapshot.isDragging && (
                            <Item>{item && item.text}</Item>
                        )}
                    </React.Fragment>
                )}
            </Draggable>

        )

    }
}
export default class FoldList extends Component {
    constructor(props) {
        super(props)
        this.state = { ...props }
        this.renderItems = this.renderItems.bind(this)
        this.onClick = this.onClick.bind(this)
    }
    onClick() {
        this.setState({ ...this.state, list: { ...this.state.list, toggled: !this.state.list.toggled } })
    }
    renderItems() {
        let { list: { items }, parentIndex, listName } = this.state
        return (
            <div>
                {
                    items && Object.keys(items).map((i, k) => {
                        let item = items[i]
                        return (
                            <ListItem key={k} item={{ ...item, text: item.label || item.name }} index={parentIndex * 1000 + k} parent={listName} />
                        )
                    })
                }
            </div>
        )
    }

    render() {

        const { list, listName } = this.state


        return (
            <Droppable
                droppableId={listName}
                type="item"
                isDropDisabled={true}
            >
                {(provided, snapshot) => (
                    <Container
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        isDraggingOver={snapshot.isDraggingOver}
                    >


                        <NodeHeader
                            node={{ name: list.name, children: list.items, toggled: list.toggled }}
                            onClick={() => this.onClick()}
                            // onSelect={isFunction(onSelect) ? (() => onSelect(node)) : undefined}
                        />
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
                            }}>
                                {list.toggled ? this.renderItems() : null}
                            </Drawer>
                        </div>

                        {/*provided.placeholder*/}
                    </Container>
                )}
            </Droppable>

        )

    }
}