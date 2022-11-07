const Filter = ({ handleSearchChange, search }) => (
  <>
    filter shown with <input value={search} onChange={handleSearchChange} />
  </>
);

export default Filter