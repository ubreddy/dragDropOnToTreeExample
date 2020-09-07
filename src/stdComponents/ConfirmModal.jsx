import React from 'react';
import styled from 'styled-components';
import { Modal, ModalBody, Button } from 'reactstrap'
const ModalContainer = styled(Modal)` &&& {
    text-align: center;
    max-width: 300px;
   }
   `
const Row = styled.div.attrs((props) => ({
    className: "row",
}))`
   margin-top: 0px;
   font-size: 0.6rem;
   `;

const ModalHeader = styled.div`
     margin: 10px;
   `
const Btn = styled(Button)`
 padding-x: 10px;
 font-size:0.6rem;

`


export class ConfirmModal extends React.Component {

    render() {

        let props = this.props

        if (props.submit && props.close)
            return (

                <ModalContainer isOpen toggle={props.close}  >

                    <ModalBody>

                        <h4 className="">{props.modalTitle}</h4>


                        <ModalHeader>{props.modalText}</ModalHeader>

                        <Row>

                            <Btn className=" offset-sm-3 col-sm-3" size="sm" color="secondary" onClick={props.close}><img src="/img/no.png" alt="" />Cancel</Btn>
                            <Btn size="sm" className="offset-sm-1 col-sm-3" color="primary" onClick={props.submit}><img src="/img/yes.png" alt="" />OK</Btn>{' '}
                        </Row>

                    </ModalBody>
                </ModalContainer>
            )
        else return (<div></div>)
    }
}
