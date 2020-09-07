import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components'
const Div =styled.div( {
    color: '#E2C089'
})
const Loading = ({ className }) => (
    <Div className={className}>loading...</Div>
);

Loading.propTypes = {
    style: PropTypes.object
};

export default Loading;