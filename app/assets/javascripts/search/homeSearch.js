function homeSearch() {
  placeAutoComplete();
  dateRangePicker();
  persistSearchData();
  guestListener();
}

function persistSearchData() {
  if (sessionStorage.place) { $('#location').val(sessionStorage.place) };
  if (sessionStorage.guests) {
    $('#guests').val(sessionStorage.guests)
    sessionStorage.setItem('guests', $('#guests').val());
  } else {
    $('#guests').val(1)
  };

  if (sessionStorage.date_range) {
    $('input[name="date_range"]').daterangepicker({
      "startDate": sessionStorage.date_range.split(' - ')[0],
      "endDate": sessionStorage.date_range.split(' - ')[1]
    });
  } else {
    $('input[name="date_range"]').daterangepicker();
  };
};

function placeAutoComplete() {
  let location = document.getElementById('location');
  let autocomplete = new google.maps.places.Autocomplete(location);

  autocomplete.addListener('place_changed', function() {
    let place = autocomplete.getPlace();

    sessionStorage.setItem('place', place.formatted_address );
    window.location.href = "/properties";
  });
};

function dateRangePicker() {
  $('input[name="date_range"]').on('apply.daterangepicker', function() {
    let date = document.getElementById('date_range');

    sessionStorage.setItem('date_range', date.value);
    window.location.href = "/properties";
  });
};

function guestListener() {
  let guests = document.getElementById('guests');

  guests.addEventListener('change', function() {
    sessionStorage.setItem('guests', guests.value);
    window.location.href = "/properties";
  });
};