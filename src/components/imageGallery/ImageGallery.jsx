import PropTypes from 'prop-types';
import { GalleryList } from './ImageGalleryStyled';
import  ImageGalleryItem  from 'components/imageGalleryItem/ImageGalleryItem';

 const ImageGallery = ({ images, onClick }) => {
  return (
    <GalleryList>
      {images.length > 0 &&
        images.map(({ id, webformatURL, largeImageURL, tags }) => {
          return (
            <ImageGalleryItem
              key={id}
              image={webformatURL}
              largeImg={largeImageURL}
              name={tags}
              onClick={onClick}
            ></ImageGalleryItem>
          );
        })}
    </GalleryList>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    })
  ),
  onClick: PropTypes.func.isRequired,
};


 export default ImageGallery;