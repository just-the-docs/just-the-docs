# Population IO API Javascript

Simple universal Javascript Wrapper around Population.IO API

## Installation

`$ yarn add api-population-io`

`$ npm install --save api-population-io`

## Usage

Import the module in your code

```javascript
import populationIO from 'api-population-io';

const populationIO = require('api-population-io');
```

Then, use the module to perform your request to PopulationIO API

You can either use promises..

```javascript
populationIO.lifeExpectancy.total({
  sex: 'male',
  country: 'United Kingdom',
  dob: '1970-01-01'
})
  .then((data) => {
    console.log('total_life_expectancy:', data.total_life_expectancy);
  })
  .catch((err) => {
    console.log(err.detail);
  });
```

.. or callbacks, by passing the function as the second parameter

```javascript
populationIO.lifeExpectancy.total({
  sex: 'male',
  country: 'United Kingdom',
  dob: '1970-01-01'
}, (err, data) => {
  if (err) {
    console.log(err.detail);
  } else {
    console.log('total_life_expectancy:', data.total_life_expectancy);
  }
});
```


## API methods

### Countries 

*Returns a list of all countries in the statistical dataset*

##### Syntax

`populationIO.countries([callback])`

##### Note

These are also the valid input values to the various 'country' parameters across the remaining API.

---

### Word Population Rank

The world population rank is defined as the position of someone's birthday among the group of living people of the
same sex and country of origin, ordered by date of birth decreasing. The last person born is assigned rank #1.

#### Today

*Calculates the world population rank of a person with the given date of birth, sex and country of origin as of 
today*

##### Syntax

`populationIO.wpRank.today(data, [callback])`

Requires a `data` object as the first parameter with the following properties:
* `dob` - type `string:date` - the subject's date of birth
* `sex` - type `string` - the subject's sex
* `country` - type `string` - the subject's country of birth (`World` for all)

---

#### On Date

*Calculates the world population rank of a person with the given date of birth, sex and country of origin on a 
certain date*

##### Syntax

`populationIO.wpRank.onDate(data, [callback])`

Requires a `data` object as the first parameter with the following properties:
* `dob` - type `string:date` - the subject's date of birth
* `sex` - type `string` - the subject's sex
* `country` - type `string` - the subject's country of birth (`World` for all)
* `date` - type `string:date` - the date to calculate the rank for

---

#### When Aged

*Calculates the world population rank of a person with the given date of birth, sex and country of origin on a 
certain date as expressed by the person's age.*

##### Syntax

`populationIO.wpRank.whenAged(data, [callback])`

Requires a `data` object as the first parameter with the following properties:
* `dob` - type `string:date` - the subject's date of birth
* `sex` - type `string` - the subject's sex
* `country` - type `string` - the subject's country of birth (`World` for all)
* `age` - type `string:offset` - the given age

---

#### Ago

*Calculates the world population rank of a person with the given date of birth, sex and country of origin on a 
certain date as expressed by an offset towards the past from today*

##### Syntax

`populationIO.wpRank.ago(data, [callback])`

Requires a `data` object as the first parameter with the following properties:
* `dob` - type `string:date` - the subject's date of birth
* `sex` - type `string` - the subject's sex
* `country` - type `string` - the subject's country of birth (`World` for all)
* `offset` - type `string:offset` - how much time back in the past to calculate the rank for

---

#### In

*Calculates the world population rank of a person with the given date of birth, sex and country of origin on a 
certain date as expressed by an offset towards the future from today*

##### Syntax

`populationIO.wpRank.in(data, [callback])`

Requires a `data` object as the first parameter with the following properties:
* `dob` - type `string:date` - the subject's date of birth
* `sex` - type `string` - the subject's sex
* `country` - type `string` - the subject's country of birth (`World` for all)
* `offset` - type `string:offset` - how much time in the future to calculate the rank for

---

#### Ranked

*Calculates the day on which a person with the given date of birth, sex and country of origin has reached (or will 
reach) a certain world population rank.*

##### Syntax

`populationIO.wpRank.whenRanked(data, [callback])`

Requires a `data` object as the first parameter with the following properties:
* `dob` - type `string:date` - the subject's date of birth
* `sex` - type `string` - the subject's sex
* `country` - type `string` - the subject's country of birth (`World` for all)
* `rank` - type `int` - the rank to calculate the date for

---

### Life Expectancy

#### Remaining

*Calculate remaining life expectancy of a person with given sex, country, and age at a given point in time.*

##### Syntax

`populationIO.lifeExpectancy.remaining(data, [callback])`

Requires a `data` object as the first parameter with the following properties:
* `sex` - type `string` - the subject's sex
* `country` - type `string` - the subject's country of birth (`World` for all)
* `date` - type `string:date` - the point in time to calculate the remaining life expectancy at
* `age` - type `string:offset` - the subject's age at the given point in time

---

#### Total

*Calculate total life expectancy of a person with given sex, country, and date of birth*

##### Syntax

`populationIO.lifeExpectancy.total(data, [callback])`

Requires a `data` object as the first parameter with the following properties:
* `sex` - type `string` - the subject's sex
* `country` - type `string` - the subject's country of birth (`World` for all)
* `dob` - type `string:date` - the subject's date of birth

---

### Population

#### By Age and Year

*Retrieve population table for all countries and a specific age group in the given year*

##### Syntax

`populationIO.population.byAgeAndYear(data, [callback])`

Requires a `data` object as the first parameter with the following properties:
* `age` - type `int` - the age to retrieve the population table for
* `year` - type `int` - the year to retrieve the population table for

---

#### By Age and Year and Country

*Retrieve population table for a specific age group in the given year and country*

##### Syntax

`populationIO.population.byAgeAndYearAndCountry(data, [callback])`

Requires a `data` object as the first parameter with the following properties:
* `age` - type `int` - the age to retrieve the population table for
* `year` - type `int` - the year to retrieve the population table for
* `country` - type `string` - the country to retrieve the population table for

---

#### By Year and Country

*Retrieve population table for all countries and a specific age group in the given year*

##### Syntax

`populationIO.population.byYearAndCountry(data, [callback])`

Requires a `data` object as the first parameter with the following properties:
* `year` - type `int` - the year to retrieve the population table for
* `country` - type `string` - the country to retrieve the population table for

---

#### By Age and Country

*Retrieve population tables for a specific age group in the given country*

##### Syntax

`populationIO.population.byAgeAndCountry(data, [callback])`

Requires a `data` object as the first parameter with the following properties:
* `age` - type `int` - the age to retrieve the population table for
* `country` - type `string` - the country to retrieve the population table for

---

#### By Country and Date

*Determines total population for a given country on a given date*

##### Syntax

`populationIO.population.byCountryAndDate(data, [callback])`

Requires a `data` object as the first parameter with the following properties:
* `country` - type `string` - the country to retrieve the population table for
* `date` - type `string:date` - the date to determine the total population for

---

#### Today and Tomorrow

*Determines total population for a given country with separate results for today and tomorrow*

##### Syntax

`populationIO.population.todayAndTomorrow(data, [callback])`

Requires a `data` object as the first parameter with the following properties:
* `country` - type `string` - the country to retrieve the population table for

---

### Mortality Distribution

#### Today

*Retrieves the mortality distribution tables for the given country, sex and age*

`populationIO.mortalityDistribution.today(data, [callback])`

Requires a `data` object as the first parameter with the following properties:
* `country` - type `string` - the country to retrieve the distribution for
* `sex` - type `string` - the sex to retrieve the distribution for
* `age` - type `string:offset` - the age to retrieve the population table for

---

## Contributing

See something that could be improved ? [Open an issue](https://github.com/TheRizzen/api-population-io-js/issues/new) or contribute !

* Fork it
* Create your feature branch
* Commit your changes and push them to your branch
* Create a new Pull Request

## License

MIT
