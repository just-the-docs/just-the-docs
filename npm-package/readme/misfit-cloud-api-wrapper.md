misfit-cloud-api-wrapper
=======================

Nodejs wrapper for [Misfit Cloud API](https://build.misfit.com)

## Installation

Install from NPM.

```bash
npm install misfit-cloud-api --save
```

## Usage

```javascript
var MisfitAPI = require('misfit-cloud-api'); 
```

### Redirect to authorization URL

```javascript
var mySettings = {
	clientKey:'your clientKey',//clientKey in our developer portal
	clientSecret:'your clientSecret',//clientSecret in our developer portal
	redirect_uri: 'https://your.redirect_uri.here',
};
var misfitApi = new MisfitAPI(mySettings);
misfitApi.authorize(function(err,redirectURL){
  //redirect to redirectURL here
});

```

### Exchange access token and get profile

```javascript
var mySettings = {
	clientKey:'your clientKey',//clientKey in our developer portal
	clientSecret:'your clientSecret',//clientSecret in our developer portal
	redirect_uri: 'https://your.redirect_uri.here',
};
var misfitApi = new MisfitAPI(mySettings);
misfitApi.exchange(req.query.code, function(err,token){//req.query.code: the code parameter in URL
  if(err){
    return callback(err);
  }
  misfitApi.getProfile({token:token.access_token},function(err,profile){
    if(err)return callback(err);
    if(profile&&profile.userId){
      //do what ever you want with the profile, like login.
    }else{
      //exception?
    }
  })
});
```

### Get Summary Data

```javascript
misfitApi.getSummary({
	token:'the access_token you got in the exchange step',
	start_date:'2014-10-01',
	end_date:'2014-10-27',
	detail:true
},
function(err,result){
	if (err || !result) {
		return callback(err);
	}
	//iterate result.summary array here
	/* example:
	date: "2014-08-18"
	points: 278
	steps: 1940
	calories: 2147.7344
	activityCalories: 521.2341
	distance: 0.9178
	*/
});
 ```

### Get Goal Data

```javascript
misfitApi.getGoals({
		token:'the access_token you got in the exchange step',
		start_date:'2014-10-01',
		end_date:'2014-10-27',
	},
	function(err,result){
		if (err || !result) {
			return callback(err);
		}
		//iterate result.goals array here
		/*
		id: "c6a530001cb"
		date: "2014-10-11"
		points: 618
		targetPoints: 1000
		*/
	}
);
```
