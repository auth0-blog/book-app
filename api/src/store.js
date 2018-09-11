const Sequelize = require('sequelize');
const casual = require('casual');
import _ from 'lodash';

const db = new Sequelize('coolreads', null, null, {
  dialect: 'sqlite',
  storage: './coolreads.sqlite',
});

const AuthorModel = db.define('author', {
  first_name: { type: Sequelize.STRING },
  last_name: { type: Sequelize.STRING },
});

const BookModel = db.define('book', {
  title: { type: Sequelize.STRING },
  cover_image_url: { type: Sequelize.STRING },
  average_rating: { type: Sequelize.STRING },
});

AuthorModel.hasMany(BookModel);
BookModel.belongsTo(AuthorModel);

// // create mock data with a seed, so we always get the same
// casual.seed(123);
// db.sync({ force: true }).then(() => {
//   _.times(10, () => {
//     return AuthorModel.create({
//       first_name: casual.first_name,
//       last_name: casual.last_name,
//     }).then((author) => {
//       return author.createBook({
//         title: casual.title,
//         cover_image_url: casual.url,
//         average_rating: casual.integer(-10, 10),
//       });
//     });
//   });
// });

const Author = db.models.author;
const Book = db.models.book;

export { Author, Book };