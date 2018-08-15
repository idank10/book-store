import React, { Component  } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import DateTime from 'react-datetime';

const genres = {
    'Science fiction' : 'Science Fiction',
    Satire : 'Satire',
    Drama : 'Drama',
    Action: 'Action',
    Romance: 'Romance',
    Mystery : 'Mystery',
    Horror : 'Horror'
};



class Create extends Component {

  constructor() {
    super();
    this.state = {
      isbn: '',
      title: '',
      author: '',
      description: '',
      published_date: new Date(),
      genre: '',
      price: '',
    };

      this.genreOptions = Object.keys(genres).map(key =>
          <option value={key}>{genres[key]}</option>
      );
  }
  onChange = (e) => {
    const state = this.state;
    state[e.target.name] = e.target.value;
    this.setState(state);
  };

    onDateChanged = (date) => {
      this.setState({published_date: date});
    };


    onSubmit = (e) => {
    e.preventDefault();

    this.state.published_date = this.state.published_date.toLocaleString('he-IL');
    const { isbn, title, author, description, published_date, genre,price } = this.state;

    axios.post('/api/book', { isbn, title, author, description, published_date, genre,price })
      .then((result) => {
        this.props.history.push("/")
      });
  };

  render() {
    const { isbn, title, author, description,published_date, genre,price } = this.state;
    return (
      <div className="container">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">
              ADD BOOK
            </h3>
          </div>
          <div className="panel-body">
            <h4><Link to="/"><span className="glyphicon glyphicon-th-list" aria-hidden="true"></span> Book List</Link></h4>
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label for="isbn">ISBN:</label>
                <input type="number" required className="form-control" name="isbn" value={isbn} onChange={this.onChange} placeholder="ISBN" />
              </div>
              <div className="form-group">
                <label for="title">Title:</label>
                <input type="text" required className="form-control" name="title" value={title} onChange={this.onChange} placeholder="Title" />
              </div>
              <div className="form-group">
                <label for="author">Author:</label>
                <input type="text" required className="form-control" name="author" value={author} onChange={this.onChange} placeholder="Author" />
              </div>
              <div className="form-group">
                <label for="description">Description:</label>
                <textArea className="form-control" required name="description" onChange={this.onChange} placeholder="Description" cols="80" rows="3">{description}</textArea>
              </div>
              <div className="form-group">
                <label for="published_date">Published Date:</label>
                <DateTime dateFormat="DD/MM/YYYY" timeFormat="A"  value={published_date} required onChange={(date) => this.onDateChanged(date)} />
              </div>
              <div className="form-group">
                <label for="price">Price:</label>
                <input type="number"  required className="form-control" name="price" value={price} onChange={this.onChange} placeholder="Price" />
              </div>
              <div className="form-group col-md-6">
                  <select className="form-control" required value={genre} name="genre" onChange={this.onChange}>
                    <option value="">Select Genre</option>
                      {this.genreOptions}
                  </select>
              </div>

              <button type="submit" className="btn btn-default">Submit</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Create;
