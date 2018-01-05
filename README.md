# jdAddressByGoogle
Módulo responsável pelo tratamento um JSON de endereços retornado pela  API <b>geocode</b> da Google

## How to do
O objeto contém dois métodos:

### getAddressFormated
Chame o método passando como parâmetro o JSON retornado de <a href="https://developers.google.com/maps/documentation/geocoding/intro?hl=pt-br"><b>Google Geocode URL</b></a>

<b>Ex.:</b>

```javascript
var rawJsonFromGoogle = {
   "results" : [
      {
         "address_components" : [
            {
               "long_name" : "q",
               "short_name" : "1600",
               "types" : [ "street_number" ]
            },
            {
               "long_name" : "Amphitheatre Pkwy",
               "short_name" : "Amphitheatre Pkwy",
               "types" : [ "route" ]
            },
            {
               "long_name" : "Mountain View",
               "short_name" : "Mountain View",
               "types" : [ "locality", "political" ]
            },
            {
               "long_name" : "Santa Clara County",
               "short_name" : "Santa Clara County",
               "types" : [ "administrative_area_level_2", "political" ]
            },
            {
               "long_name" : "California",
               "short_name" : "CA",
               "types" : [ "administrative_area_level_1", "political" ]
            },
            {
               "long_name" : "United States",
               "short_name" : "US",
               "types" : [ "country", "political" ]
            },
            {
               "long_name" : "94043",
               "short_name" : "94043",
               "types" : [ "postal_code" ]
            }
         ],
         "formatted_address" : "1600 Amphitheatre Parkway, Mountain View, CA 94043, USA",
         "geometry" : {
            "location" : {
               "lat" : 37.4224764,
               "lng" : -122.0842499
            },
            "location_type" : "ROOFTOP",
            "viewport" : {
               "northeast" : {
                  "lat" : 37.4238253802915,
                  "lng" : -122.0829009197085
               },
               "southwest" : {
                  "lat" : 37.4211274197085,
                  "lng" : -122.0855988802915
               }
            }
         },
         "place_id" : "ChIJ2eUgeAK6j4ARbn5u_wAGqWA",
         "types" : [ "street_address" ]
      }
   ],
   "status" : "OK"
};

var addressCleared = jdAddressByGoogle().getAddressFormatted(rawJsonFromGoogle);
```
#### Retorno

É retornado então um array com as seguintes chaves:

```javascript
addressCleared[pais]                  = 'United States'; //A country do endereço
addressCleared[cep]                   = '94043'; //O postal_code
addressCleared[uf]                    = 'California'; //A Administrative_area_level_1
addressCleared[ufShort]               = 'CA'; //A short_name
addressCleared[cidade]                = 'Santa Clara County'; //A administrative_area_level_2
addressCleared[bairro]                = null; // A sublocality
addressCleared[logradouro]            = 'Amphitheatre Pkwy'; //A route
addressCleared[numero]                = '1600'; //O street_number (Quando a chave 'multipleNumbers' for <b>True</b>, o  número retornado será um intermediária entre o menor e maior valor.
addressCleared[multipleNumbers]       = false; //<b>True</b> ou <b>False</b>. Caso o endereço não retorne um número preciso (Ex.: 230-250), a chave em questão virá como <b>True</b>.
addressCleared[endereco_formatado]    = null; // O formatted_address
addressCleared[originalPosition][lat] = null; // Ainda não implementado
addressCleared[originalPosition][lng] = null; // Ainda não implementado
```
### getAddressWithoutNumber



