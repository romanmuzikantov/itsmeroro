import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { createNewNotesItem } from '../../repository/firebase/firebase.utils';

import './modal.styles.scss';
import { selectCurrentNote } from '../../redux/notes/notes.selectors';

class NotesModal extends React.Component {

    constructor(props) {
        super(props);

        
        this.state = {
            title: '',
            content: '',
        }
    }

    componentWillUpdate(props) {
        
    }

    handleSubmit = event => {
        event.preventDefault();

        var text = this.state.content;
        text = text.trim();

        if(!text) {
            this.setState({
                ...this.state,
                content: ''
            })

            return;
        }
        
        createNewNotesItem(this.state)

        this.setState({
            title: '',
            content: '',
        })
        this.props.onHide();
    }

    handleChange = event => {
        const { value, name } = event.target;
        
        this.setState({ [name]: value });
    }

    render() {
        return (
            <Modal
            {...this.props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            className="modal">
                <Modal.Body>
                    <Form className="my-modal-body" onSubmit={this.handleSubmit}>
                        <Form.Group controlId="formBasicName">
                            <Form.Control name="title" placeholder="Titre" onChange={this.handleChange} value={this.state.title} />
                        </Form.Group>
                        <Form.Group controlId="formBasicContent">
                            <Form.Control name="content" placeholder="Contenu" as="textarea" rows="10" onChange={this.handleChange} value={this.state.content} required  />
                        </Form.Group>
                        <Button className="my-modal-confirm" variant="primary" type="submit">Envoyer</Button>
                    </Form>
                </Modal.Body>
            </Modal>
        )
    }

}

const mapStateToProps = createStructuredSelector({
    currentNote: selectCurrentNote
})

export default connect(mapStateToProps)(NotesModal);