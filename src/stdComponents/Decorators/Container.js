import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { VelocityComponent } from 'velocity-react';
// import styled from 'styled-components'

import Header from './Header'
import Toggle from './Toggle'

class Container extends PureComponent {
    renderToggle() {
        const { toggled } = this.props.node;



        return (
            <VelocityComponent animation={{ rotateZ: toggled ? 90 : 0 }} duration={300}>
                {this.renderToggleDecorator()}
            </VelocityComponent>
        );
    }

    renderToggleDecorator() {

        return <Toggle onClick={this.props.onClick} />;
    }

    render() {
        const {
            decorators, terminal, node, onSelect, customStyles, provided
        } = this.props;
        return (
            <div >
                {!terminal ? this.renderToggle() : null}
                <Header node={node} customStyles={customStyles} onSelect={onSelect} iconType={terminal ? 'file-text' : 'folder'} />
            </div>
        );
    }
}

Container.propTypes = {
    customStyles: PropTypes.object,
    // style: PropTypes.object.isRequired,

    terminal: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
    onSelect: PropTypes.func,

    node: PropTypes.object.isRequired
};

Container.defaultProps = {
    onSelect: null,
    customStyles: {}
};

export default Container;