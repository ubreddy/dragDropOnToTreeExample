import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components'

const NodeIcon = styled.i({
    marginRight: '5px'
});

const HeaderBase = styled.div({
    display: 'inline-block',
    verticalAlign: 'top',
    color: '#9DA5AB'
})
const HeaderTitle = styled.div({
    lineHeight: '24px',
    verticalAlign: 'middle'
})

const Header = ({ onSelect, node, iconType }) => {

    return (
        <HeaderBase onClick={onSelect}>
            <HeaderTitle >
                <span>
                    {iconType && <NodeIcon className={`fa fa-${iconType}`} />}
                </span>
                {node.name}
            </HeaderTitle>
        </HeaderBase>
    )
};

Header.propTypes = {
    onSelect: PropTypes.func,
    style: PropTypes.object,
    customStyles: PropTypes.object,
    node: PropTypes.object.isRequired
};

Header.defaultProps = {
    customStyles: {}
};

export default Header;