import React, { Component } from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import BasicSelect from './components/select';
import logoImage from './assets/stack.png';

class TagList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: [],
      loading: true,
      error: null,
      sortBy: 'activity',
      pageSize: 20,
    };
    this.handlePageSize20 = this.handlePageSize.bind(this, 20);
    this.handlePageSize50 = this.handlePageSize.bind(this, 50);
    this.handlePageSize100 = this.handlePageSize.bind(this, 100);
  }

  componentMount() { 
    this.fetchTags();
  }

  fetchTags() {
    const { sortBy, pageSize } = this.state;
    let url = '';
    switch (sortBy) {
      case 'activity':
        url = `https://api.stackexchange.com/2.3/tags?order=desc&sort=activity&pagesize=${pageSize}&site=stackoverflow`;
        break;
      case 'creation':
        url = `https://api.stackexchange.com/2.3/tags?order=asc&sort=activity&pagesize=${pageSize}&site=stackoverflow`;
        break;
      case 'popular':
        url = `https://api.stackexchange.com/2.3/tags?order=desc&sort=popular&pagesize=${pageSize}&site=stackoverflow`;
        break;
      case 'name':
        url = `https://api.stackexchange.com/2.3/tags?order=asc&sort=name&pagesize=${pageSize}&site=stackoverflow`;
        break;
      default:
        url = `https://api.stackexchange.com/2.3/tags?order=desc&sort=activity&pagesize=${pageSize}&site=stackoverflow`;
    }

    const fetchTimeout = 10000;
    const fetchPromise = fetch(url)
      .then(response => response.json());

    const timeoutPromise = new Promise((resolve, reject) => {
      setTimeout(() => {
        reject(new Error('Data loading timeout exceeded'));
      }, fetchTimeout);
    });

    Promise.race([fetchPromise, timeoutPromise])
      .then(data => {
        console.log("Data loaded:", data);
        const latestTags = data.items;
        this.setState({ tags: latestTags, loading: false, error: null });
      })
      .catch(error => {
        console.error("Error loading data:", error);
        this.setState({ error: error.message, loading: false });
      });
  }

  handleChangeSortBy = (sortBy) => {
    this.setState({ sortBy, loading: true }, () => {
      this.fetchTags();
    });
  }

  handlePageSize = (pageSize) => {
    this.setState({ pageSize, loading: true }, () => {
      this.fetchTags();
    });
  }

  render() {
    const { tags, loading, error } = this.state;

    if (loading) {
      return <div className='errorMessage'>Please wait...</div>;
    }

    if (error) {
      return <div className='errorMessage'>Error: {error}</div>;
    }

    return (
      <div>
        <img src={logoImage} alt="Stack Overflow Logo" />
        <h2>Tags on Stack Overflow</h2>
        <div className="buttons">
          <BasicSelect handleChangeSortBy={this.handleChangeSortBy} sortBy={this.state.sortBy} />
          <ButtonGroup size="large" variant="contained" aria-label="Basic button group">
            <Button onClick={() => this.handlePageSize(20)}>20</Button>
            <Button onClick={() => this.handlePageSize(50)}>50</Button>
            <Button onClick={() => this.handlePageSize(100)}>100</Button>
          </ButtonGroup>
        </div>
        <ul>
          {tags.map(tag => (
            <li key={tag.name}>
              <strong>#{tag.name}</strong> - {tag.count} posts
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default TagList;
