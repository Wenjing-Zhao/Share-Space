const SearchBar = () => {
  return (
    <form action="/" method="get">
      <label htmlFor="header-search">
        <span className="visually-hidden">Search blog posts</span>
      </label>
      <input
        type="text"
        id="header-search"
        placeholder="Search blog posts"
        name="s"
      />
      <button type="submit">Search</button>
    </form>
  );
};

// .visually-hidden {
//   clip: rect(0 0 0 0);
//   clip-path: inset(50%);
//   height: 1px;
//   overflow: hidden;
//   position: absolute;
//   white-space: nowrap;
//   width: 1px;
// }

export default SearchBar;
