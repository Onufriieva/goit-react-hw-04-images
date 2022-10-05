import React, {useState, useEffect} from "react";
import Modal from "components/modal/Modal";
import ImageGallery from "components/imageGallery/ImageGallery";
import Searchbar from "components/searchbar/Searchbar";
import Loader from "components/loader/Loader";
import axios from 'axios';
import { StyledApp } from "./AppStyled";
import Button from "components/button/Button";



export function App () {
const [images, setImages] = useState([]);
const [loading, setLoading] = useState(false);
// const [error, setError] = useState(null);
const [name, setName] = useState('');
const [page, setPage] = useState(1);
const [showModal, setShowModal] = useState(false);
const [modalContent, setModalContent] = useState('');



useEffect(() => {
  if(name) {    
    fetchImages(name, page).then(response => {
      setImages(prev => [...prev, ...response]); 
   })
  }
}, [name, page])




const handleChangeState = (name) => {
 setImages([]);
setName(name);
setLoading(false)
setPage(1)
};



const fetchImages = async (name, page) => {
  try {
    const response = await axios.get(
      `https://pixabay.com/api/?q=${name}&page=${page}&key=29221253-dd17a46566e1be23f7ca8ff9b&image_type=photo&orientation=horizontal&per_page=12`
    );
    return response.data.hits;
  } catch (error) {
    console.log(error);
  } finally {
    setLoading(false);
  }
};


const handleLoadMoreBtn = () => {
  setPage((prev) => {return prev + 1});
  setLoading(false);       
};


const closeModal = () => {
  setShowModal(false);
  setModalContent('');
};


const openModal = largeImg => {
  setShowModal(true);
  setModalContent(largeImg); 
};


 
  return (
    <StyledApp>
      <Searchbar onSubmit={handleChangeState}></Searchbar>
      <ImageGallery images={images} onClick={openModal}></ImageGallery>
      {loading && <Loader />}
      {images.length > 0 && <Button onClick={handleLoadMoreBtn} />}
      {showModal && (
        <Modal onClose={closeModal}>
          <img src={modalContent} alt="" />
        </Modal>
      )}
    </StyledApp>
  );
}
