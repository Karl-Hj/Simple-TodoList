export function FilterTodoList({ filterName, setFilterName }) {
  return (
    <>
      <label htmlFor="filter">Filter</label>
      <input
        id="filter"
        type="text"
        value={filterName}
        onChange={(e) => setFilterName(e.target.value)}
      />
    </>
  );
}
