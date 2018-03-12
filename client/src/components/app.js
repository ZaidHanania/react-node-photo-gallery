import React, { Component } from 'react';
import { connect } from 'react-redux';
import FontAwesome from 'react-fontawesome';

import { fetchPhotos } from '../actions';

class App extends Component {
  constructor(props) {
    super(props);

    // Set up initial state
    this.state = {
      currentIndex: 0,
      sharks: true,
      cats: true,
      pending: false
    }
  }

  // Check nextProps to determine pending state
  componentWillReceiveProps(nextProps) {
    if (nextProps.photos !== this.props.photos) {
      this.setState({pending: false});
    }
  }

  componentDidMount() {
    // Fetch pics from server when app loads
    this.fetchPics();
  }

  // Action dispatcher ro fetch pics from server
  fetchPics() {
    this.setState({
      pending: true, // Set pending state
      currentIndex: 0 // Reset index
    }, () => {
      this.props.fetchPhotos(this.state.sharks, this.state.cats);
    });
  }
  
  // Function to handle back button click
  onClickBack() {
    if (this.state.currentIndex > 0) {
      this.setState({currentIndex: this.state.currentIndex - 1 });
    }
  }

  // Function to handle next button click
  onClickNext() {
    if (this.state.currentIndex < this.props.photos.length - 1) {
      this.setState({currentIndex: this.state.currentIndex + 1 });
    }
  }

  // Function to render FontAwesome spinner
  renderSpinner() {
    return (
      <FontAwesome
        className="loader"
        name="spinner"
        size="3x"
        spin
      />
    );
  }

  // Function ro render back button
  renderBack() {
    // Decide on showing button based on state using css classes
    var className = `arrow ${this.state.currentIndex === 0 || this.state.pending ? 'hidden' : ''}`;

    return (
      <div>
        <FontAwesome 
          className={className} 
          name='angle-left' 
          size="5x" 
          onClick={this.onClickBack.bind(this)} />
      </div>
    );
  }

  // Function ro render next button
  renderNext() {
    // Decide on showing button based on state using css classes
    var className = `arrow ${this.state.currentIndex === this.props.photos.length - 1  || this.state.pending ? 'hidden' : ''}`;

    return (
      <div>
        <FontAwesome 
          className={className} 
          name='angle-right' 
          size="5x" 
          onClick={this.onClickNext.bind(this)} />
      </div>
    );
  }

  // Function to render image container
  renderImage() {
    return (
      <div className="imageContainer"> 
        <img 
          className="image" 
          src={this.props.photos[this.state.currentIndex]} />
        <div className={this.state.pending ? 'overlay' : 'hidden'}>
          {this.renderSpinner()}
        </div>
      </div>
    );
  }

  // Function to handle sharks filter
  onClickSharks() {
    this.setState({sharks: !this.state.sharks}, () => this.fetchPics());
  }

  // Function to handle cats filter
  onClickCats() {
    this.setState({cats: !this.state.cats}, () => this.fetchPics());
  }

  render() {
    // If no photos yet, display loader
    if (this.props.photos.length === 0) {
      return (
      <div className="mainContainer">
        {this.renderSpinner()}
      </div>
      );
    }

    return (
      <div className="mainContainer">
        <h1 className="title">Shark & Cat Gallery</h1>
        <div className="carousel">
          {this.renderBack()}
          {this.renderImage()}
          {this.renderNext()}
        </div>
        <div>
          <button 
            className={this.state.sharks ? 'button button-active' : 'button'} 
            onClick={this.onClickSharks.bind(this)}>Sharks</button>
          <button 
            className={this.state.cats ? 'button button-active' : 'button'} 
            onClick={this.onClickCats.bind(this)}>Cats</button>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { 
    photos: state.photoList
  };
}

export default connect(mapStateToProps, { fetchPhotos })(App);
