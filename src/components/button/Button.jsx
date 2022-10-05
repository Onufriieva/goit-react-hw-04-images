import PropTypes from 'prop-types';
import { LoadMoreBtn } from './ButtonStyled'

const Button = ({ onClick }) => {
  return <LoadMoreBtn onClick={() => onClick()}>Load more</LoadMoreBtn>;
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default Button;