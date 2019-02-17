import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Pagination } from "semantic-ui-react";
import { editCriteria } from "../actions";

class SearchPagination extends Component {
  //set state then edit criteria object with the activePage value to request
  //a new set of data linked to that activePage value
  handlePaginationChange = (e, { activePage }) => {
    this.props.editCriteria("page", activePage);
  };

  calculateTotalPages = () => {
    const carsPerPage =
      this.props.metadata.total_count / this.props.metadata.per_page;
    const totalPagesToShow = Math.ceil(carsPerPage);
    return totalPagesToShow;
  };

  componentDidUpdate(prevProps, prevState) {
    //smoothly navigate to the top of the window each time user clicks on next page
    const options = { top: 0, left: 0, behavior: "smooth" };
    window.scrollTo(options);
  }

  render() {
    return (
      <Fragment>
        {this.props.cars.length ? (
          <div className="search-results__pagination--flex">
            <Pagination
              defaultActivePage={1}
              activePage={this.props.metadata.page}
              boundaryRange={0}
              onPageChange={(e, data) => this.handlePaginationChange(e, data)}
              totalPages={this.calculateTotalPages()}
            />
          </div>
        ) : (
          <span />
        )}
      </Fragment>
    );
  }
}

SearchPagination.propTypes = {
  criteria: PropTypes.object,
  cars: PropTypes.array,
  metadata: PropTypes.object,
  editCriteria: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    cars: state.data.response.data,
    criteria: state.data.criteria,
    metadata: state.data.response.metadata
  };
};

export default connect(
  mapStateToProps,
  { editCriteria }
)(SearchPagination);
