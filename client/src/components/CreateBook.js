import React from 'react';
import { Query, Mutation } from "react-apollo";
import { Redirect } from "react-router-dom";
import { gql } from "apollo-boost";

const ADD_BOOK = gql`
  mutation addBook($title: String!, $cover_image_url: String!, $average_rating: Float!, $authorId: Int!){
    addBook(title: $title, cover_image_url: $cover_image_url, average_rating: $average_rating, authorId: $authorId){
      id
      title
      cover_image_url
      average_rating
    }
  }
`

export default () => (
  <Mutation mutation={ADD_BOOK} onCompleted={() => window.location.href="/" }>
      {(addBook, { data, loading, error }) => (
        <div>
          <div className='w-100 pa4 flex justify-center'>
            <form
              onSubmit={e => {
                e.preventDefault();
                addBook({ variables: {
                  title: this.title.value,
                  cover_image_url: this.coverImage.value,
                  average_rating: parseFloat(this.rating.value),
                  authorId: parseInt(this.authorId.value)
                }});

                this.title.value = "";
                this.coverImage.value = "";
                this.rating.value = "";
                this.authorId.value = "";
              }}
            >

            <div style={{ maxWidth: 400 }} className=''>
              <label> Book Title: </label>
              <input
                className='w-100 pa3 mv2'
                type="text"
                required
                placeholder='Title of the book'
                ref={node => this.title = node} />

              <label> Book Cover Image: </label>
              <input
                className='w-100 pa3 mv2'
                type="url"
                required
                placeholder='Image Url'
                ref={node => this.coverImage = node} />

              <label> Book Rating as decided by Popular votes: </label>
              <input
                className='w-100 pa3 mv2'
                type="number"
                required
                min="1"
                max="10"
                placeholder='Average Rating'
                ref={node => this.rating = node} />

              <label> Author: </label>
              <select
                ref={select => this.authorId = select}
                name="authorId" required>
                <option value="">Select an author</option>
                <option value="1">Wole Soyinka</option>
                <option value="2">Tomi Adeyemi</option>
                <option value="3">Chimamanda Adichie</option>
              </select>
            </div>
            {loading && <p>Loading...</p> }
            {error && <p>Error :( Please try again</p>}

            <button type="submit">Add Book</button>
            </form>
          </div>
        </div>
      )}
  </Mutation>
);