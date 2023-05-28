import classes from "./SearchFilter.module.css";

// This component displays a search bar and a select menu for filtering the albums/artists.

const SearchFilter = ({
  searchFunction,
  sortFunction,
  placeholderText,
  options,
}) => {
  return (
    <div className={classes.searchContainer}>
      <input
        type="text"
        placeholder={placeholderText}
        className={classes.search}
        onChange={(event) => {
          searchFunction(event.target.value);
        }}
      />
      <select
        name="filter"
        id="filter"
        className={classes.select}
        onChange={(event) => {
          sortFunction(event.target.value);
        }}
      >
        {options.map((option, i) => {
          return (
            <option
              key={i}
              value={option.value}
            >
              {option.text}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default SearchFilter;
