import React from 'react';
import { Query } from "react-apollo";
import { gql } from "apollo-boost";
import '../App.css';

const LIST_BOOKS = gql`
  query AllBooks {
    books {
      id
      title
      cover_image_url
      average_rating
    }
  }
`

export default () => (
  <Query query={LIST_BOOKS}>
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error...</p>;

      return (
        <div className="col-sm-12">
          {!loading &&
            data.books.map(book => (
              <div className="col-sm-4" key={book.id}>
                <div className='pa3 bg-black-05 ma3'>
                  <div
                    style={{
                      backgroundImage: `url(${book.cover_image_url})`,
                      backgroundSize: 'cover',
                      paddingBottom: '100%',
                    }}
                  />
                  <div>
                    <div className='movie'>
                      <h3 align="center"> { book.title }&nbsp; </h3>
                      <h4 align="center">Average Rating:  { book.average_rating } / 10 </h4>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      );
    }}
  </Query>
);