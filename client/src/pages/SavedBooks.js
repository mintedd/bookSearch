import React from 'react';
import {
  Jumbotron,
  Container,
  Card,
  Button,
  CardColumns,
} from 'react-bootstrap';

import { useQuery, useMutation } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import { REMOVE_BOOK } from '../utils/mutations';

import Auth from '../utils/auth';
import { removeBookId } from '../utils/localStorage';


const SavedBooks = () => {
  const [removeBook, {error}] = useMutation(REMOVE_BOOK);
  const { loading, data } = useQuery(QUERY_ME);

  // use this to determine if `useEffect()` hook needs to run again
  const userData = data?.me || {};

    const handleDeleteBook = async (bookId) => {
      const token = Auth.loggedIn() ? Auth.getToken() : null;
      if (!token) {
        return false;
      }
      try {
        const {data} = await removeBook({ 
          variables: {
            bookId
          },
        });
        if (!data) {
          throw new Error("something went wrong!");
        }
        removeBookId(bookId);
      } catch (err) {
        console.error(err);
      }
      if (loading) {
        return <h2>LOADING...</h2>;
      }
        // if (!token) {
        //   return false;
        // }

        // const response = await getMe(token);

        // if (!response.ok) {
        //   throw new Error('something went wrong!');
        // }
     
    }

  return (
    <>
      <Jumbotron fluid className='text-light bg-dark p-5'>
        <Container>
          <h1>Viewing saved books!</h1>
        </Container>
      </Jumbotron>
      <Container>
        <h2 className='pt-5'>
          {userData.savedBooks.length
            ? `Viewing ${userData.savedBooks.length} saved ${userData.savedBooks.length === 1 ? 'book' : 'books'}:`
            : 'You have no saved books!'}
        </h2>
        <CardColumns>
          {userData.savedBooks.map((book) => {
            return (
              <Card key={book.bookId} border="dark">
                {book.image ? (
                  <Card.Img
                    src={book.image}
                    alt={`The cover for ${book.title}`}
                    variant="top"
                  />
                ) : null}
                <Card.Body>
                  <Card.Title>{book.title}</Card.Title>
                  <p className="small">Authors: {book.authors}</p>
                  <Card.Text>{book.description}</Card.Text>
                  <Button
                    className="btn-block btn-danger"
                    onClick={() => handleDeleteBook(book.bookId)}
                  >
                    Delete this Book!
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
};

export default SavedBooks;
