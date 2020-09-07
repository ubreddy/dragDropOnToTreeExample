import React, { Component } from 'react';
import PropTypes from 'prop-types';
import shallowEqual from 'shallowequal';
import deepEqual from 'deep-equal';
import Decorators from './Decorators'
const Container = Decorators.Container

class NodeHeader extends Component {
    shouldComponentUpdate(nextProps) {
        const props = this.props;
        const nextPropKeys = Object.keys(nextProps);

        for (let i = 0; i < nextPropKeys.length; i++) {
            const key = nextPropKeys[i];
            if (key === 'animations') {
                continue;
            }

            const isEqual = shallowEqual(props[key], nextProps[key]);
            if (!isEqual) {
                return true;
            }
        }

        return !deepEqual(props.animations, nextProps.animations, { strict: true });
    }

    render() {
        const {
            node, onClick, onSelect, customStyles, provided
        } = this.props;
        const { children } = node;
        const terminal = !children;

        return (

            <Container

                node={node}
                onClick={onClick}
                customStyles={customStyles}
                onSelect={onSelect}
                terminal={terminal}
                provided={provided}
            />

        );
    }
}

NodeHeader.propTypes = {
    // style: PropTypes.object.isRequired,
    customStyles: PropTypes.object,

    node: PropTypes.object.isRequired,
    onClick: PropTypes.func,
    onSelect: PropTypes.func
};

NodeHeader.defaultProps = {
    customStyles: {}
};

export default NodeHeader;