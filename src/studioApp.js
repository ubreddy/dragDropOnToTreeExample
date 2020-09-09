import React from 'react';
// import ReactDOM from 'react-dom';
import '@atlaskit/css-reset';
import styled from 'styled-components';
// import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { DragDropContext } from 'react-beautiful-dnd';
// import { lists, treeData } from './initialData';
import { lists } from './initialData';
import { complexTree } from './data'
import { Button } from 'reactstrap'

import Tree from './stdComponents/Tree'
// import { genName } from './util'
// import NodeHeader from './stdComponents/NodeHeader'
// import Drawer from './stdComponents/Drawer'
import FoldList from './stdComponents/FoldList'
// import TreeNode from './stdComponents/TreeNode'
import { mutateTree, moveItemOnTree, flattenTree } from './utils/tree'
import { VelocityComponent } from 'velocity-react';
import Toggle from './stdComponents/Decorators/Toggle'
import { calculateFinalDropPositions } from './utils/Tree-utils'
import DelayedFunction from './utils/delayed-function';
// import App1 from './App'

const ItemsContainer = styled.div`
 height: 100vh; 
 overflow-y: hidden;
 &:hover {
   overflow-y: overlay;
 }
`
const Steps = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: hidden;
  margin-left: 15px;
  background-color: ${props =>
    props.isDraggingOver ? 'lightgrey' : 'inherit'};
  &:hover {
    overflow-y: overlay;
  }
  height: 90%;
  width: 100%;
  &::-webkit-scrollbar-track {
    background: floralwhite; 
    border-radius: 20px;
};
&::-webkit-scrollbar-thumb {
  background-color: bisque;
  border-radius: 20px;
  border: 1px solid pink;
}

  `

const Title = styled.h3`
  padding: 2px 4px 2px 8px;
  margin-top: 0px ;
  text-align: center;
  border-bottom: grey 1px dashed;
`;
const FlowContainer = styled.div`
  margin: 10px 15px 0px;
  border: 1px solid lightgrey;
  background-color: antiquewhite;
  border-radius: 10px;
  box-shadow: 0 3.2px 7.2px 0 rgba(0,0,0,.18), 0 0.6px 1.8px 0 rgba(0,0,0,.11);
  height: 500px;
  width: 400px;
  overflow: hidden;
  
`;

// const Container = styled.div`  
//   background-color: ${props =>
//     props.isDraggingOver ? 'lightgrey' : 'inherit'};
// `;

const Heading = styled.div`
display: flex;
box-shadow: 0 3.2px 7.2px 0 rgba(0,0,0,.18), 0 0.6px 1.8px 0 rgba(0,0,0,.11);
margin: 10px;
width: 100%;
padding: 10px;
`

const ContentContainer = styled.div`
box-shadow: 0 -3.2px -7.2px 0 rgba(0,0,0,.18), 0 0.6px 1.8px 0 rgba(0,0,0,.11);
// background: #f5f5f5;
border-radius: 5px;
margin: 10px;
width: 100%;

padding: 10px;
`
// const ContentHeading = styled.h3`
// border-bottom: 1px lightgrey dotted;
// `

const MenuButton = styled(Button)`
  
  background-color: lightgrey;
  color: grey;
  
  text-align: justify;
  margin-left: 5px;
  font-size: 0.75rem;
  padding: 5px 10px;  
`
// const Item = styled.div`
//   border: none;
//   padding: 4px;
  
//   margin:  2px 2px 2px 10px;
//   background-color: ${props => (props.isDragging ? 'lightgreen' : 'inherit')};
//   font-size: 0.75rem;
// `

export default class App extends React.Component {
  constructor(props) {
    super(props)
    // this.state = { ...props }
    this.state = { ...props, lists, tree: complexTree };
    this.optionsMenu = [{ label: 'View', class: 'fa fa-eye' }, { label: 'Edit', class: 'fa fa-pencil-square-o' }, { label: 'Add Topic', class: 'fa fa-plus' }, { label: 'Save', class: 'fa fa-floppy-o' }, { label: 'Publish', class: 'fa fa-angle-double-right' }, { label: 'Preview', class: 'fa fa-play-circle' }]
    this.optionsMenuClick = this.optionsMenuClick.bind(this)
    this.updateState = this.updateState.bind(this)
    this.closeModalEdit = this.closeModalEdit.bind(this)
    this.validate = this.validate.bind(this)
    this.closeModalView = this.closeModalView.bind(this)
    this.fieldsMeta = [{ name: 'name', label: 'Name', readOnly: true }, { name: 'title', label: 'Title' }, { name: 'purpose', type: 'textarea', label: 'Purpose', otherProps: { rows: 4, placeholder: 'Brief purpose of this learning' } }, { name: 'intro', type: 'textarea', label: 'Introduction', otherProps: { rows: 4, placeholder: 'Brief intro of this learning used to display to trainee' } }]
    this.onExpand = this.onExpand.bind(this)
    this.onCollapse = this.onCollapse.bind(this)
    this.onDragStart = this.onDragStart.bind(this)
    this.onDragUpdate = this.onDragUpdate.bind(this)
    this.onDragEnd = this.onDragEnd.bind(this)
    this.expandTimer = new DelayedFunction(500);
    this.isExpandable = (item) => !!item.hasChildren && !item.isExpanded;
  }


  optionsMenuClick(val) {

    // console.log(val)
    // do the necessary menu action here....
    switch (val) {
      case 'Edit':
        // invoke modal edit form.
        this.setState({
          ...this.state,
          modalEdit: true,

        })
        break
      case 'View':
        // invoke modal view form.
        this.setState({
          ...this.state,
          modalView: true,
        })
        break;
      case 'Add Survey':
        this.collectionUpdate({ index: this.state.topicQuizOrder.length - 1, action: 'Insert Survey' })
        break
      case 'Add Topic':
        this.collectionUpdate({ index: -1, action: 'Insert' })
        break

      default:
        this.collectionUpdate({ index: this.props.index, action: val })
    }

  }
  closeModalView() {
    this.setState({
      ...this.state,

      modalView: false,

    })
  }
  closeModalEdit() {
    this.setState({
      ...this.state,
      modalEdit: false,

    })
  }
  updateState(values) {

    let newLearning = {
      ...this.state,
      isDirty: true,
      ...values,
      modalEdit: !this.state.modalEdit
    }
    this.setState(newLearning);

  }
  validate() {

  }


  static getIcon(
    item,
    onExpand,
    onCollapse,
  ) {
    if (item.children && item.children.length > 0) {
      return (
        <VelocityComponent animation={{ rotateZ: item.isExpanded ? 90 : 0 }} duration={300}>
          <Toggle onClick={() => item.isExpanded ? onCollapse(item.id) : onExpand(item.id)} />
        </VelocityComponent>
      )
    } else
      return <div></div>
  }

  onExpand(itemId) {
    const { tree } = this.state;
    this.setState({
      ...this.state,
      tree: mutateTree(tree, itemId, { isExpanded: true }),
    });
  }

  onCollapse(itemId) {
    const { tree } = this.state;
    this.setState({
      ...this.state,
      tree: mutateTree(tree, itemId, { isExpanded: false }),
    });
  }
  onDragStart(result) {

    console.log(`drag start ${JSON.stringify(result)}`)
    const { tree } = this.state;
    const itemId = result.draggableId
    this.dragState = {
      source: result.source,
      destination: result.source,
      mode: result.mode,
    };

    if (result.source.droppableId.includes('tree') && tree.items[itemId] && tree.items[itemId].isExpanded) {

      this.setState({
        ...this.state,
        tree: mutateTree(tree, itemId, { isExpanded: false }),
        draggedItemId: result.draggableId,
      });
    } else {
      this.setState({
        ...this.state,
        draggedItemId: result.draggableId,
      });
    }

  }
  onDragUpdate(update) {

    const { tree } = this.state;
    console.log(`drag update${JSON.stringify(update)}`);



    if (!this.dragState) {
      return;
    }
    this.expandTimer.stop();
    if (update.combine) {
      const { draggableId } = update.combine;
      const item = tree.items[draggableId];
      if (item && this.isExpandable(item)) {
        this.expandTimer.start(() => this.onExpand(draggableId, item.path));
      }
    }
    this.dragState = {
      ...this.dragState,
      destination: update.destination,
      combine: update.combine,
    };

  }
  onDragEnd(result) {
    const { tree } = this.state;
    console.log(`drag end${JSON.stringify(result)}`)

    this.expandTimer.stop();
    const finalDragState = {
      ...this.dragState,
      source: result.source,
      destination: result.destination,
      combine: result.combine,
    };

    const flattenedTree = flattenTree(tree);
    const { sourcePosition, destinationPosition } = calculateFinalDropPositions(tree, flattenedTree, finalDragState);


    if (!destinationPosition) {
      return;
    }

    const newTree = moveItemOnTree(tree, sourcePosition, destinationPosition);
    this.setState({
      ...this.state,
      tree: newTree,
      draggedItemId: undefined,
    });
    this.dragState = undefined;
  }






  renderItem(props) {

    // isDragging={snapshot.isDragging}
    const { item, onExpand, onCollapse, provided, snapshot, } = props
    const Div = styled.div`
    `

    return (
      <Div ref={provided.innerRef}   {...provided.draggableProps}
        isDragging={snapshot.isDragging}
      >
        <div style={{ display: 'flex' }}>
          <div >
            {App.getIcon(item, onExpand, onCollapse)}
          </div>
          <span {...provided.dragHandleProps} style={{ display: 'inline-block' }}>{item.data ? item.data.title : ''}</span>
        </div>


      </Div>
    );
  }
  render() {
    // let fieldsMeta = this.fieldsMeta
    let optionsMenu = this.optionsMenu
    // let { quizzes, topics, surveys, topicQuizOrder, survey, modalEdit, modalView, isDirty, ...learning } = this.state
    // if (!surveys || !Object.keys(surveys).length) {
    //   optionsMenu = Array.from(this.optionsMenu)
    //   optionsMenu.splice(3, 0, { label: 'Add Survey', class: 'fa fa-plus-circle' })
    // }
    // else optionsMenu = this.optionsMenu
    const lists = this.state.lists
    // let { slots, apis, actions, cards } = this.state.lists
    // const flow = { items: [{ name: 'Step ', }] }
    let tree = this.state.tree
    return (
      <div className="container-fluid">
        <Heading className="row justify-content-between">
          <h2 className="col-auto"> Flow Studio </h2>
          <div className="col-auto">
            {optionsMenu && optionsMenu.map((i, j) => (
              <MenuButton key={j} onClick={() => this.optionsMenuClick(i.label)}>
                <div ><i aria-hidden="true"
                  className={`${i.class}`}></i><span className="ml-1" >{i.label}</span></div>
              </MenuButton>
            ))
            }
          </div>
        </Heading>
        <ContentContainer className="row">
          {/* <ContentHeading className="col-12"> Microlearning Content: Topics & Quizzes ... </ContentHeading> */}
          <DragDropContext
            onDragStart={this.onDragStart}
            onDragUpdate={this.onDragUpdate}
            onDragEnd={this.onDragEnd}
          >
            <ItemsContainer className="col-sm-2" >
              {
                Object.keys(lists).map((g, j) => {
                  let list = lists[g]
                  return (
                    // <Draggable draggableId={`${node.name}`} index={this.props.index}>
                    //   {(provided, snapshot) => (
                    <FoldList key={g} listName={g} list={list} parentIndex={j} />
                    //   )
                    //   }
                    // </Draggable>
                  )
                })
              }
            </ItemsContainer>

            <div className="col-sm-10" >
              <FlowContainer>
                <Title>
                  {'Untitled flow'}
                </Title>
                <Steps>
                  <Tree
                    tree={tree}
                    renderItem={this.renderItem}
                    onExpand={this.onExpand}
                    onCollapse={this.onCollapse}
                    isDragEnabled
                    isNestingEnabled
                  />
                </Steps>
              </FlowContainer>
            </div>

          </DragDropContext>
        </ContentContainer>
      </div >
    );
  }
}


