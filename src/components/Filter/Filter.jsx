import PropTypes from 'prop-types';

function Filter({ filter, onChange }) {
  return (
    <div>
      <p>Find contacts by name</p>
      <input type="text" value={filter} onChange={onChange} />
    </div>
  );
}

Filter.propTypes = {
  filter: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Filter;
