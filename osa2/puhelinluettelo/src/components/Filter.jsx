const Filter = (
  {
    search_keyword,
    search_keyword_onChange
  }
) => {

  return (

    <>
      <h2>Search</h2>
      <div>
          Filter shown with: <input type     = "text"
                                    value    = { search_keyword }
                                    onChange = { search_keyword_onChange }/>
      </div>
      {/*
        <h4>Results</h4>
        <ul>{ (search_results.length === 0) ? 'No results' : search_results.map( result => <Person key = { result.id } person = { result } /> ) }</ul>
      */}

    </>
  )
}

export default Filter