import { Component } from 'react';

import { fetchImages } from 'services/api.jsx';
import { Searchbar } from 'components/Searchbar/Searchbar.jsx';
import { ImageGallery } from 'components/ImageGallery/ImageGallery.jsx';
// import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem.jsx';
import { Loader } from 'components/Loader/Loader.jsx';
import { Button } from 'components/Button/Button.jsx';
//5 - import { Modal } from 'components/Modal/Modal.jsx';

import { Container, Notify } from 'services/Common.styled';

export class App extends Component {
  state = {
    query: '',
    page: 1,
    images: null,
    isLoading: false,
    total: 0,
  };

  componentDidUpdate(_, prevState) {
    const { page, query } = this.state;
    if (prevState.page !== page || prevState.query !== query) {
      this.dataImages(query, page);
    }
  }

  handleInput = e => {
    this.setState({
      page: 1,
      query: e.searchQuery,
      images: null,
    });
  };

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
      isLoading: true,
    }));
  };

  dataImages = async (query, page) => {
    this.setState({ isLoading: true });
    const data = await fetchImages(query, page);

    if (page === 1) {
      this.setState(() => ({
        total: data.total,
        images: [...data.hits],
        isLoading: false,
      }));
    } else {
      this.setState(state => ({
        images: [...state.images, ...data.hits],
        isLoading: false,
      }));
    }
  };

  // onCloseModal = () => {
  //   this.setState({ isModal: false });
  // };

  render() {
    const { images, isLoading, total } = this.state;
    return (
      <Container>
        <Searchbar onSubmit={this.handleInput} />
        {isLoading && <Loader>Loading</Loader>}
        {/* <ImageGallery items={images} /> */}

        {images && (
          <>
            {images.length === 0 && <Notify>Pictures not found</Notify>}

            <ImageGallery items={images} />

            {isLoading && <Loader>Loading</Loader>}
            {images.length > 0 && images.length < total && (
              <Button onLoadMore={this.loadMore} />
            )}
            {isLoading && <Loader>Loading</Loader>}

            {images.length === total && !!images.length && (
              <Notify>No more pictures</Notify>
            )}
          </>
        )}
      </Container>
    );
  }
}
