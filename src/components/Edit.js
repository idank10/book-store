import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import DateTime from 'react-datetime';
import moment from "moment";


const genres = {
    Science_fiction : 'Science Fiction',
    Satire : 'Satire',
    Drama : 'Drama',
    Action: 'Action',
    Romance: 'Romance',
    Mystery : 'Mystery',
    Horror : 'Horror'
};

class Edit extends Component {

  constructor(props) {
    super(props);
    this.state = {
      book: {}
    };
      this.genreOptions = Object.keys(genres).map(key =>
          <option value={key}>{genres[key]}</option>
      );
  }

  componentDidMount() {
    axios.get('/api/book/'+this.props.match.params.id)
      .then(res => {
        this.setState({ book: res.data });
        console.log(this.state.book);
      });
  }



  onChange = (e) => {
    const state = this.state.book;
    state[e.target.name] = e.target.value;
    this.setState({book:state});
  }

    onDateChanged = (date) => {
        var book = {...this.state.book};
        book.published_date = date;
        this.setState({book})
    };

  onSubmit = (e) => {
    e.preventDefault();

      const { isbn, title, author, description,published_date, genre,price } = this.state.book;


    axios.put('/api/book/'+this.props.match.params.id, { isbn, title, author, description, published_date, genre, price })
      .then((result) => {
        this.props.history.push("/show/"+this.props.match.params.id)
      });
  }

  render() {
      const { isbn, title, author, description,published_date, genre,price } = this.state.book;
    return (
      <div className="container">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">
              EDIT BOOK
            </h3>
          </div>
          <div className="panel-body">
            <h4><Link to={`/show/${this.state.book._id}`}><span className="glyphicon glyphicon-eye-open" aria-hidden="true"></span> Book List</Link></h4>
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label for="isbn">ISBN:</label>
                <input type="number" className="form-control" name="isbn" value={isbn} onChange={this.onChange} placeholder="ISBN" />
              </div>
              <div className="form-group">
                <label for="title">Title:</label>
                <input type="text" className="form-control" name="title" value={title} onChange={this.onChange} placeholder="Title" />
              </div>
              <div className="form-group">
                <label for="author">Author:</label>
                <input type="text" className="form-control" name="author" value={author} onChange={this.onChange} placeholder="Author" />
              </div>
              <div className="form-group">
                <label for="description">Description:</label>
                <input type="text" className="form-control" name="description" value={description} onChange={this.onChange} placeholder="Description" />
              </div>
             <div className="form-group">
                <label for="published_date">Published Date:</label>
                 <DateTime dateFormat="DD/MM/YYYY" timeFormat="A"  value={moment(published_date).format('MMMM Do YYYY, h:mm:ss a')} required onChange={(date) => this.onDateChanged(date)} />
              </div>
              <div className="form-group">
                <label for="price">Price:</label>
                <input type="number"  required className="form-control" name="price" value={price} onChange={this.onChange} placeholder="Price" />
              </div>
              <div className="form-group col-md-3">
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

export default Edit;
