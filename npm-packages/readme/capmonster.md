# capmonster

NodeJS wrapper for [capmonster.cloud](https://capmonster.cloud)

![capmonster](https://nodei.co/npm/capmonster.png?downloads=true&downloadRank=true&stars=true)

# Features

- Easy-to-use
- Asynchronous
- Result same with original API
  
Currently only support NoCaptchaProxyless and ImageCaptcha for easy solving

# Quick Examples

```js
const capmonster = require('capmonster');
const captcha = new capmonster('API KEY');

// Get current balance
captcha.getBalance().then((balance) => {
	console.log(balance);
});
// -> { errorId: 0, balance: 69.420 }

// Create vanilla task
captcha.createTask({
		type: 'NoCaptchaTaskProxyless',
		websiteURL: 'https://discord.com/register',
		websiteKey: '6Lef5iQTAAAAAKeIvIY-DeexoO3gj7ryl9rLMEnn',
	})
	.then((result) => {
		console.log(result);
    });
// -> { errorId: 0, errorCode: '', errorDescription: '', taskId: 1467834466 }
```

# Documentation

#### getBalance()

Get user balance.

```js
const capmonster = require('capmonster');
const captcha = new capmonster('API KEY');

captcha.getBalance().then((balance) => {
    console.log(balance)
});
```
Return
```js
{ 
  errorId: 0,
  balance: 7.4045902
}
```

#### createTask(task)

Create new vanilla task.
See [docs](https://zennolab.atlassian.net/wiki/spaces/APIS/pages/557229/Captcha+Task+Types) to fill ``task`` arguments

```js
const capmonster = require('capmonster');
const captcha = new capmonster('API KEY');

captcha.createTask({
		type: 'NoCaptchaTaskProxyless',
		websiteURL: 'https://discord.com/register',
		websiteKey: '6Lef5iQTAAAAAKeIvIY-DeexoO3gj7ryl9rLMEnn',
	})
	.then((result) => {
		console.log(result);
    });
```
Return
```js
{ 
  errorId: 0,
  errorCode: '',
  errorDescription: '',
  taskId: 1467834466
}
```

#### getResult(taskId)

Get task result.

``taskId`` : Task ID from create task method.

```js
const capmonster = require('capmonster');
const captcha = new capmonster('API KEY');

captcha.getResult(6969420).then((result) => {
  console.log(result)
});
```
Return (solution object are different each captcha type)
```js
{
  errorId: 0,
  errorCode: '',
  errorDescription: null,
  status: 'ready',
  solution: { text: 'hwsrrc' }
}
```

#### solveReCaptchaV2(websiteURL, websiteKey)

Create new ReCaptchaV2 task.

``websiteURL`` : Website URL where you see the captcha.
``websiteKey`` : Website ReCaptcha key.

``<div class="g-recaptcha" data-sitekey="THIS"></div>``

```js
const capmonster = require('capmonster');
const captcha = new capmonster('API KEY');

captcha.solveReCaptchaV2('https://discord.com/register','6Lef5iQTAAAAAKeIvIY-DeexoO3gj7ryl9rLMEnn')
	.then((result) => {
		console.log(result);
	});
```
Return
```js
{ 
  errorId: 0,
  errorCode: '',
  errorDescription: '',
  taskId: 918381052
}
```

#### solveImageCaptcha(base64)

Create new image captcha task.

``base64`` :  base64 encoded of the captcha image.

```js
const capmonster = require('capmonster');
const captcha = new capmonster('API KEY');

captcha.solveImageCaptcha('/9j/4AAQSkZJ....').then((result) => {
	console.log(result)
});
```
Return
```js
{ 
  errorId: 0,
  errorCode: '',
  errorDescription: '',
  taskId: 407984145
}
```

#### decodeReCaptchaV2(websiteURL, websiteKey)

Create new ReCaptchaV2 task and wait until task solved.

``websiteURL`` : Website URL where you see the captcha.
``websiteKey`` : Website ReCaptcha key.

``<div class="g-recaptcha" data-sitekey="THIS"></div>``

```js
const capmonster = require('capmonster');
const captcha = new capmonster('API KEY');

captcha.decodeReCaptchaV2('https://discord.com/register','6Lef5iQTAAAAAKeIvIY-DeexoO3gj7ryl9rLMEnn')
	.then((result) => {
		console.log(result);
	});
```
Return
```js
{
  errorId: 0,
  errorCode: null,
  errorDescription: null,
  solution: {
    gRecaptchaResponse: '03AGdBq26nelcHXOB8mBN...'
  },
  status: 'ready'
}
```

#### decodeImageCaptcha(base64)

Create new image captcha task and wait until solved.

``base64`` :  base64 encoded of the captcha image.

```js
const capmonster = require('capmonster');
const captcha = new capmonster('API KEY');

captcha.decodeImageCaptcha('/9j/4AAQSkZJ....').then((result) => {
	console.log(result)
});
```
Return
```js
{
  errorId: 0,
  errorCode: '',
  errorDescription: null,
  status: 'ready',
  solution: { text: 'Cr1nG3' }
}
```

# Contributing

Just open pull request if it just some minor changes.  
Create a issue first if it some major changes of how this wrapper work.

# License

Copyright © 2020 Haneul Seong <hana@disroot.org>  
This work is free. You can redistribute it and/or modify it under the  
terms of the Do What The Fuck You Want To Public License, Version 2,  
as published by Sam Hocevar. See the LICENSE file for more details.  