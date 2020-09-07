import React from 'react';
import styled from 'styled-components';
import { ConfirmModal } from '.'
import * as styles from './styles'
import { Button } from 'reactstrap'

const MenuContainer = styled.div`
outline: none;
position: absolute;
max-height: 300px;
border: 1px solid lightgrey;
border-radius: 2px;
font-size: 0.75rem;
color: rgb(50, 49, 48);
background: #fefefe;
z-index: 500;
`
const MenuList = styled.ul`
list-style: none;
margin: 0;
padding: 0;
display: block;
margin-block-start: 1em;
    margin-block-end: 0.5em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
`
const MenuItem = styled.li`
`
const MenuButton = styled(Button)`
  border: none;
  background-color: transparent;
  color: grey;
  width: 100%;
  text-align: left;
  margin: 0;
  font-size: 0.75rem;
  padding: 0px 10px;  
`
export default class OptionsMenu extends React.Component {
    constructor(props) {
        super(props)
        this.state = { showDD: false, hover: props.hover }
        this.toggleMenu = this.toggleMenu.bind(this)
        this.menuClick = this.menuClick.bind(this)
        this.confirmCancel = this.confirmCancel.bind(this)
        this.confirmSubmit = this.confirmSubmit.bind(this)
    }

    toggleMenu() {
        this.setState({
            ...this.state,
            showDD: !this.state.showDD
        })
    }
    menuClick(val) {
        if (val !== 'Delete') this.props.menuClick(val)
        this.setState({
            ...this.state,
            hover: false,
            showDD: false,
            confirm: val === 'Delete' && val
        })
    }
    confirmSubmit() {
        this.setState({
            ...this.state,
            hover: false,
            confirm: false
        })
        this.props.menuClick(this.state.confirm)
    }
    confirmCancel() {
        this.setState({
            ...this.state,
            confirm: false
        })
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.hover !== this.props.hover)
            this.setState({
                ...this.state,
                hover: this.props.hover,
                showDD: false
            })
    }
    render() {
        let EllMenuDiv = styles.EllMenuDiv
        let EllIcon = styles.Icons.EllIcon

        let { showDD, confirm, hover } = this.state
        let props = this.props || [{ class: 'fa fa-eye', label: 'View' }, { class: 'fa fa-pencil-square-o', label: 'Edit' }, { class: 'fa fa-clone', label: 'Clone' }, { class: 'fa fa-plus-circle', label: 'Insert' }, { class: 'fa fa-trash', label: 'Delete' }]
        return (
            <div>
                <EllMenuDiv >
                    <div className="row position-absolute">
                        {hover && <span><EllIcon onClick={this.toggleMenu}></EllIcon></span>}
                    </div>
                    <div className="row">
                        {hover && showDD && <ItemMenu menuClick={this.menuClick} menuData={props.menuData} />}
                    </div>
                </EllMenuDiv>
                {confirm && <ConfirmModal modalTitle={confirm} modalText={`Are you sure you want to ${confirm}?`} submit={this.confirmSubmit} close={this.confirmCancel} />}
            </div>

        )
    }
}
class ItemMenu extends React.Component {

    render() {
        let items = this.props.menuData
        return (
            <MenuContainer  >
                <div >
                    <MenuList role="menu">
                        {
                            items && items.map((i, j) => (
                                <MenuItem key={j} role="presentation" onClick={() => this.props.menuClick(i.label)}><MenuButton name={i.label}
                                    role="menuitem" >
                                    <div ><i aria-hidden="true"
                                        className={`${i.class} mr-2`}></i><span className="ml-2" >{i.label}</span></div>
                                </MenuButton></MenuItem>
                            ))
                        }
                    </MenuList>
                </div>
            </MenuContainer>
        )
    }
}
