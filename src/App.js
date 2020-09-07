import React, { Component } from 'react';
import '@atlaskit/css-reset';
import styled from 'styled-components';
import Navigation from '@atlaskit/navigation'
// import { SideNavigation } from '@atlaskit/side-navigation';

import { Button } from 'reactstrap';
import Tree, {
  mutateTree,
  moveItemOnTree
} from '@atlaskit/tree';
import { complexTree } from './initialData';
import { VelocityComponent } from 'velocity-react';

// const Navigation1 = styled(Navigation)`
// `
const ToggleBase = styled.div`
    position: relative;
    display: inline-block;
    vertical-align: top;
    margin-left: -5px;
    height: 24px;
    width: 24px;
`;

const ToggleWrapper = styled.div`    
    position: absolute;
    top: 50%;
    left: 50%;
    margin: -6px 0 0 -6px;
    height: 12px;
`
const Arrow = styled.polygon`
    fill: #9DA5AB;
    stroke-width: 0;
`;



const ChevronDownIcon = styled.i.attrs(p => ({
  className: 'fa fa-chevron-down'
}))``
const ChevronRightIcon = styled.i.attrs(p => ({
  className: 'fa fa-chevron-right'
}))``

const ChevButton = styled(Button)`
border: none;
padding :0;
margin: 0 5px;
// background: inherit; 
`

const Container = styled.div`
  margin: 10px;
`;

const Dot = styled.span`
  display: flex;
  width: 24px;
  height: 32px;
  justify-content: center;
  font-size: 12px;
  line-height: 24px;
`;

const Toggle = ({ onClick }) => {
  const width = 12, height = 12;
  const midHeight = height * 0.5;
  const points = `0,0 0,${height} ${width},${midHeight}`;

  return (
    <ToggleBase onClick={onClick}>
      <ToggleWrapper >
        <svg {...{ height, width }}>
          <Arrow points={points} />
        </svg>
      </ToggleWrapper>
    </ToggleBase>
  );
};

const DivHover = styled.div`
  overflow-y : hidden;
  overflow-x : none;
  &:hover {
    overflow-y: auto;
  }
`

const Node = ({ snapshot, item, provided, onCollapse, onExpand }) => {

  return (
    <div {...provided.dragHandleProps} className="row">
      <div className="col-md-2">
        {DragDropWithNestingTree.getIcon(item, onExpand, onCollapse)}
      </div>
      <span className="col-md-10" style={{ display: 'inline-block' }}>{item.data ? item.data.title : ''}</span>
    </div>
  )
}
export default class DragDropWithNestingTree extends Component {
  state = {
    tree: complexTree,
  };

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
      // return item.isExpanded ? (
      //   <ChevButton
      //     spacing="none"
      //     appearance="subtle-link"
      //     onClick={() => onCollapse(item.id)}
      //   >
      //     <span>
      //       <ChevronDownIcon
      //         label=""
      //         size="medium"
      //         onClick={() => onCollapse(item.id)}
      //       /></span>
      //   </ChevButton>
      // ) : (
      //     <ChevButton
      //       spacing="none"
      //       appearance="subtle-link"
      //       onClick={() => onExpand(item.id)}
      //     >
      //       <span>
      //         <ChevronRightIcon
      //           label=""
      //           size="medium"
      //           onClick={() => onExpand(item.id)}
      //         />
      //       </span>
      //     </ChevButton>
      //   );
    }
    return <Dot>&bull;</Dot>;
  }

  renderItem = (props) => {


    const { item, onExpand, onCollapse, provided, snapshot, } = props
    return (
      <div ref={provided.innerRef}   {...provided.draggableProps}>

        <Node style={{ padding: '0 5px' }} {...props} />
      </div>
    );
  };

  onExpand = (itemId) => {
    const { tree } = this.state;
    this.setState({
      tree: mutateTree(tree, itemId, { isExpanded: true }),
    });
  };

  onCollapse = (itemId) => {
    const { tree } = this.state;
    this.setState({
      tree: mutateTree(tree, itemId, { isExpanded: false }),
    });
  };

  onDragStart = (source) => {
    const { tree } = this.state;
    let item = tree.items[source]
    const newItem = { ...item, isExpanded: false }
    const newTree = { ...tree, items: { ...tree.items, newItem } }
    this.setState({ tree: newTree })
  }

  onDragEnd = (
    source,
    destination
  ) => {
    const { tree } = this.state;

    if (!destination) {
      return;
    }

    const newTree = moveItemOnTree(tree, source, destination);
    this.setState({
      tree: newTree,
    });
  };

  render() {
    const { tree } = this.state;

    return (
      <Container className="container-fluid">
        <div className="row" >
          <div className="col-4">
          </div>
          <div className="col-auto">
            <div style={{ height: '100vh', flexGrow: 1, flexShrik: 1 }} >

              <Tree
                tree={tree}
                renderItem={this.renderItem}
                onExpand={this.onExpand}
                onCollapse={this.onCollapse}
                onDragEnd={this.onDragEnd}
                onDragStart={this.onDragStart}
                isDragEnabled
                isNestingEnabled
              />

            </div>
          </div>
          <div className="col-auto">
            <div style={{ height: '100vh', flexGrow: 1, flexShrik: 1 }} >

              <Tree
                tree={tree}
                renderItem={this.renderItem}
                onExpand={this.onExpand}
                onCollapse={this.onCollapse}
                onDragEnd={this.onDragEnd}
                onDragStart={this.onDragStart}
                isDragEnabled
                isNestingEnabled
              />

            </div>
          </div>
        </div>
      </Container >
    );
  }
}