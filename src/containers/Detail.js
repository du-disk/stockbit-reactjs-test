import { Component } from 'react';
import { connect } from "react-redux";
import { Link } from "react-router-dom";

/* Local Components */
import Header from '../components/Header';
import Placeholder from "../assets/img/placeholder.png";
/* Actions */
import { getMovie } from "../store/actions/movieAction"

class App extends Component {

  componentDidMount() {
    const { id } = this.props.match.params;

    this.props.getMovie(id);
  }

  onError(e) {
    e.target.src = Placeholder;
  }

  render() {
    const { isFetching, item } = this.props;

    return (
      <div className="App w-50 m-auto mb-2">
        <Header
          className="mb-1"
          title={item.Title || '...'}
          subtitle={isFetching ? '...' : `Awards ${item.Awards} | Rating ${item.imdbRating}`}
        />

        <img src={item.Poster} onError={(e) => this.onError(e)} alt={item.title} />
        <div className="card mxw-100 w-100 p-20">
          <p className="text capitalize"> {item.Type} . {item.Genre} .{item.Website} . {item.Director} . {item.Year} </p>
          <p className="text"> {item.Plot} </p>
          <table className="text-left">
            <tr>
              <td>Actors</td>
              <td>:</td>
              <td>{item.Actors}</td>
            </tr>
            <tr>
              <td>Country</td>
              <td>:</td>
              <td>{item.Country}</td>
            </tr>
            <tr>
              <td>Language</td>
              <td>:</td>
              <td>{item.Language}</td>
            </tr>
            <tr>
              <td>Rated</td>
              <td>:</td>
              <td>{item.Rated}</td>
            </tr>
            <tr>
              <td>Released</td>
              <td>:</td>
              <td>{item.Released}</td>
            </tr>
            <tr>
              <td>Writer</td>
              <td>:</td>
              <td>{item.Writer}</td>
            </tr>
            <tr>
              <td>Production</td>
              <td>:</td>
              <td>{item.Production}</td>
            </tr>
          </table>
          <Link className="btn" to="/">Back</Link>
        </div>
      </div>
    );
  }
}

export default connect(
  ({ stockbit }) => ({
    isFetching: stockbit.movie.isFetching,
    error: stockbit.movie.error,
    item: stockbit.movie.item
  }),
  (dispatch) => ({
    getMovie: (params) => dispatch(getMovie(params))
  })
)(App);