'use-strict'

const URL='https://developer.nps.gov/api/v1/parks?';
const KEY='&api_key=DrpnFaJ2DPvtVuPtM6Lsh147fJqMfOaNdlbK8IZy'

const apiSearch = (search, numOfRes) => {
    fetch(`${URL}stateCode=${search}&limit=${numOfRes}${KEY}`)
      .then(res => {
        if(!res.ok)
          throw new Error(res.statusText)
        return res.json();  
      })
      .then(data => showRes(data))
      .catch(error => {
        $('#results-list').empty();
        $('#js-error').html(error.message);
      })
}

const showRes = data => {
    $('#js-error').empty();
    $('#results-list').html(data.data.map(row => `<strong>Park Name: ${row.name}</strong><br/>Park Description: ${row.description}<br/>URL: <a href="${row.url}">${row.url}</a><hr/>`));
}

const searchParks = () =>{
    $('#js-form').submit(e => {
        e.preventDefault();
        const search = $('#js-search').val();
        const numOfRes = $('#js-max-search').val();

        apiSearch(search, numOfRes);

        $('#js-search').val('');
        $('#js-max-search').val(10);

    })
}

$(searchParks);