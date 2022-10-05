import React, {Component} from "react";
import Modal from "components/modal/Modal";
import ImageGallery from "components/imageGallery/ImageGallery";
import Searchbar from "components/searchbar/Searchbar";
import Loader from "components/loader/Loader";
import axios from 'axios';
import { StyledApp } from "./AppStyled";
import Button from "components/button/Button";





export class App extends Component {
state = {
  images: [],
  loading: false,
  error: null,
  name: '',
  page: 1,
  showModal: false,
  modalContent: '',
};

componentDidUpdate(prevProps, prevState) {
  const prevName = prevState.name;
  const nextName = this.state.name;
  const { name, page } = this.state;
  if (prevProps.name !== this.props.name) {
    this.handleChangeState();
  }
  if (prevName !== nextName) {
    this.fetchImages(name, page).then(response => {
      this.setState({ images: response, page: page + 1, loading: false });
    });
  }
}

handleChangeState = ({ name }) => {
  this.setState({ name: name, page: 1, loading: true });
};

fetchImages = async (name, page) => {
  try {
    const response = await axios.get(
      `https://pixabay.com/api/?q=${name}&page=${page}&key=29221253-dd17a46566e1be23f7ca8ff9b&image_type=photo&orientation=horizontal&per_page=12`
    );
    return response.data.hits;
  } catch (error) {
    console.error(error);
  }
};

handleLoadMoreBtn = () => {
  const { name, page } = this.state;
  this.setState({ loading: true });
  this.fetchImages(name, page).then(response => {
    this.setState(prevState => ({
      images: [...prevState.images, ...response],
      page: prevState.page + 1,
      loading: false,
    }));
  });
};

closeModal = () => {
  this.setState({
    showModal: false,
    modalContent: '',
  });
};

openModal = largeImg => {
  this.setState({
    showModal: true,
    modalContent: largeImg,
  });
};

render() {
  const { images, loading, showModal, modalContent } = this.state;
  return (
    <StyledApp>
      <Searchbar onSubmit={this.handleChangeState}></Searchbar>
      <ImageGallery images={images} onClick={this.openModal}></ImageGallery>
      {loading && <Loader />}
      {images.length > 0 && <Button onClick={this.handleLoadMoreBtn} />}
      {showModal && (
        <Modal onClose={this.closeModal}>
          <img src={modalContent} alt="" />
        </Modal>
      )}
    </StyledApp>
  );
}
}
