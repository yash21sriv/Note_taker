import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MainScreen from '../../Components/MainScreen';
import { Button, Card, Form } from 'react-bootstrap';
import ErrorMessage from '../../Components/ErrorMessage';
import Loading from '../../Components/Loading';
import { createNoteAction } from '../../actions/notesActions';
import { useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

const CreateNote = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const noteCreate = useSelector(state => state.noteCreate);
  const { loading, error, note } = noteCreate;

  console.log(note);

  const resetHandler = () => {
    setTitle("");
    setCategory("");
    setContent("");
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if(!title || !content || !category) return;
    
    dispatch(createNoteAction(title, content, category));

    resetHandler();
    navigate('/mynotes');
  };

  return (
    <MainScreen title='Create a Note'>
        <Card>
            <Card.Header>Create a new Note</Card.Header>
            <Card.Body>
                <Form onSubmit={submitHandler}>
                    {error && <ErrorMessage variant='danger'>{error}</ErrorMessage>}
                    <Form.Group controlId='title'>
                        <Form.Label>Title</Form.Label>
                        <Form.Control type='text' value={title} placeholder='Enter the title' onChange={(e) => setTitle(e.target.value)} />
                    </Form.Group>

                    <Form.Group controlId='content'>
                        <Form.Label>Content</Form.Label>
                        <Form.Control as='textarea' value={content} placeholder='Enter the content' onChange={(e) => setContent(e.target.value)} />
                    </Form.Group>

                    {content && (
                        <Card>
                            <Card.Header>Note Preview</Card.Header>
                            <Card.Body>
                                <ReactMarkdown>{content}</ReactMarkdown>
                            </Card.Body>
                        </Card>
                    )}

                    <Form.Group controlId='content'>
                        <Form.Label>Category</Form.Label>
                        <Form.Control type='content' value={category} placeholder='Enter the category' onChange={(e) => setCategory(e.target.value)} />
                    </Form.Group>

                    {loading && <Loading size={50} />}
                    <Button type='submit' variant='primary'>
                        Create Note
                    </Button>
                    <Button className='mx-2' onClick={resetHandler} variant='danger'>
                        Reset Fields
                    </Button>
                </Form>
            </Card.Body>

            <Card.Footer className='text-muted'>
                Creating on - {new Date().toLocaleDateString()}
            </Card.Footer>
        </Card>
    </MainScreen>
  )
}

export default CreateNote;
