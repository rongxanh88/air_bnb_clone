function homeSearch() {
  placeAutoComplete();
  dateRangePicker();
  persistSearchData();
  guestListener();
}

const persistSearchData = function() {
  if (sessionStorage.place) { $('#place_search').val(sessionStorage.place) };
  if (sessionStorage.guests) { $('#guests').val(sessionStorage.guests) };
};

const placeAutoComplete = function() {
  let place_search = document.getElementById('place_search');
  let autocomplete = new google.maps.places.Autocomplete(place_search);

  autocomplete.addListener('place_changed', function() {
    let place = autocomplete.getPlace();

    sessionStorage.setItem('place', place.formatted_address );
    $('#search-button').click();
  });
};

const dateRangePicker = function() {
  if (sessionStorage.date_range) {
    $('input[name="date_range"]').daterangepicker({
      "startDate": sessionStorage.date_range.split(' - ')[0],
      "endDate": sessionStorage.date_range.split(' - ')[1]
    });
  } else {
    $('input[name="date_range"]').daterangepicker();
  };

  $('input[name="date_range"]').on('apply.daterangepicker', function() {
    let date = document.getElementById('date_range');

    sessionStorage.setItem('date_range', date.value);
  });
};

const guestListener = function() {
  let guests = document.getElementById('guests');

  guests.addEventListener('change', function() {
    sessionStorage.setItem('guests', guests.value);
  });
};