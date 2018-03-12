import React, { Component } from 'react';
import { connect } from 'react-redux';
import FontAwesome from 'react-fontawesome';

import { fetchPhotos } from '../actions';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentIndex: 0,
      sharks: true,
      cats: true,
      pending: false
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    if (nextProps.photos !== this.props.photos) {
      this.setState({pending: false});
    }
  }

  componentDidMount() {
    this.fetchPics();
  }

  fetchPics() {
    this.setState({
      pending: true,
      currentIndex: 0
    }, () => {
      this.props.fetchPhotos(this.state.sharks, this.state.cats);
    });
  }
  
  onClickBack() {
    if (this.state.currentIndex > 0) {
      this.setState({currentIndex: this.state.currentIndex - 1 });
    }
  }

  onClickNext() {
    if (this.state.currentIndex < this.props.photos.length - 1) {
      this.setState({currentIndex: this.state.currentIndex + 1 });
    }
  }

  renderBack() {
    var className = `arrow ${this.state.currentIndex === 0 || this.state.pending ? 'hidden' : ''}`;

    return (
      <div>
        <FontAwesome className={className} name='angle-left' size="5x" onClick={this.onClickBack.bind(this)} />
      </div>
    );
  }

  renderNext() {
    var className = `arrow ${this.state.currentIndex === this.props.photos.length - 1  || this.state.pending ? 'hidden' : ''}`;

    return (
      <div>
        <FontAwesome className={className} name='angle-right' size="5x" onClick={this.onClickNext.bind(this)} />
      </div>
    );
  }

  renderImage() {
    return (
      <div className="imageContainer"> 
      <img className="image" src={this.props.photos[this.state.currentIndex]} />
      <div className={this.state.pending ? 'overlay' : 'hidden'}>
        <FontAwesome
          className="loader"
          name="spinner"
          size="3x"
          spin
        />
      </div>
    </div>
    );
  }

  onClickSharks() {
    this.setState({sharks: !this.state.sharks}, () => this.fetchPics());
  }

  onClickCats() {
    this.setState({cats: !this.state.cats}, () => this.fetchPics());
  }

  render() {
    if (this.props.photos.length === 0) {
      return (
      <div className="mainContainer">
        <FontAwesome
          className="loader"
          name="spinner"
          size="3x"
          spin
        />
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
          <button className={this.state.sharks ? 'button button-active' : 'button'} onClick={this.onClickSharks.bind(this)}>Sharks</button>
          <button className={this.state.cats ? 'button button-active' : 'button'} onClick={this.onClickCats.bind(this)}>Cats</button>
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
