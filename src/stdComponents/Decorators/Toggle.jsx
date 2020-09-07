import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ToggleBase = styled.div`
    position: relative;
    display: inline-block;
    vertical-align: top;
    height: 24px;
    width: 24px;
`;

const ToggleWrapper = styled.div`    
    position: absolute;
    top: 50%;
    left: 50%;
    margin: -8px 0 0 -6px;
    height: 12px;
`
const Arrow = styled.polygon`
    fill: #9DA5AB;
    strokeWidth: 0;
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

Toggle.propTypes = {
    onClick: PropTypes.func.isRequired,
    style: PropTypes.object
};

export default Toggle;