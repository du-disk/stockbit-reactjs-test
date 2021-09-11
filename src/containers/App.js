import { Component } from 'react';
import { debounce } from 'lodash';
import { connect } from "react-redux";
/* Local Components */
import Input from '../components/Input';
import Header from '../components/Header';
import InfiniteScroll from '../components/InfiniteScroll';

/* Actions */
import { getMovies, dataReset } from "../store/actions/movieAction"

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: 'Stockbit - ReactJs Test',
      subtitle: 'Movie List',
      keyword: 'batman',
      page: 1
    }
  }

  componentDidMount() {
    const {
      page,
      keyword
    } = this.state;

    this.getMovies({ keyword, page });
  }

  changeHandler(e) {
    const { name, value } = e.target;

    this.setState({ [name]: value }, () => {
      const { page, keyword } = this.state;

      if (name === 'keyword') this.props.dataReset();

      this.getMovies({ page: name === 'keyword' ? 1 : page, keyword });
    });
  }

  searchHandler = debounce(function (e) {
    this.changeHandler(e);
  }, 500)

  async getMovies(params) {
    try {
      await this.props.getMovies(params);
    } catch (error) {
      // Code for hadnlle error here
    }
  }

  closeModal() {
    const modal = document.getElementById("myModal");
    modal.style.display = "none";
  }

  detailHandler(id) {
    this.props.history.push(`/detail/${id}`)
  }

  render() {
    const { title, subtitle, page } = this.state;
    const { isFetching, items, result, error } = this.props;

    const toggleVisible = () => {
      const floatBtn = document.getElementsByClassName('floating-button')[0];
      const scrolled = document.documentElement.scrollTop;
      if (scrolled > 50) {
        floatBtn.style.add = "block";
      }
      else if (scrolled <= 50) {
        floatBtn.style.display = "none";
      }
    };
    window.addEventListener('scroll', toggleVisible);

    return (
      <>
        <div className="App w-50 m-auto" id="top">
          <Header title={title} subtitle={subtitle} className="mb-1" />

          <div className="searchField text-left">
            <Input
              name="keyword"
              placeholder="Enter keyword.."
              onChange={(e) => this.searchHandler(e)}
            />
            <p > About {result} results.</p>
          </div>

          <InfiniteScroll
            page={page}
            items={items}
            hasMore={!error}
            loading={isFetching}
            onChange={(e) => this.changeHandler(e)}
            detailHandler={(id) => this.detailHandler(id)} />

          {isFetching && <div className="loader m-auto mb-2" />}

          {!isFetching && error && <p>{error}</p>}
        </div>

        <a className="floating-button" href="#top">Top</a>

        {/* Modal */}
        <div id="myModal" className="modal">
          <span onClick={(e) => this.closeModal()} className="close">&times;</span>
          <img className="modal-content" alt="img" id="img01" />
          <div id="caption"></div>
        </div>
      </>
    );
  }
}

export default connect(
  ({ stockbit }) => ({
    isFetching: stockbit.movie.isFetching,
    error: stockbit.movie.error,
    items: stockbit.movie.items,
    result: stockbit.movie.result
  }),
  (dispatch) => ({
    getMovies: (params) => dispatch(getMovies(params)),
    dataReset: () => dispatch(dataReset())
  })
)(App);