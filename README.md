# geocode

Simple web app to verify addresses and lookup parcel numbers and geographic coordinates for addresses.

Results come from the [City of Detroit's composite geocoder](http://gis.detroitmi.gov/arcgis/rest/services/DoIT/CompositeGeocoder/GeocodeServer) and can be downloaded or copy & pasted (but beware of formatting parcel numbers as text to preserve trailing punctuation if you use the latter method).

Want to know more? Check out [this blog post about geocoding](https://cityofdetroit.github.io/iet/blog/geocoding/).

This project is bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

## Development

`yarn` installs dependencies and `yarn start` starts the development server.

Commits to the `master` branch automatically deploy to [cityofdetroit.github.io/geocode](https://cityofdetroit.github.io/geocode/) via Netlify.
