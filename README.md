# 0x4447 AWS Lambda reCaptcha

This small AWS Lambda will help you validate any reCaptcha created by your forms.

# How to invoke this function?

If you know how to invoce a Lamda Function from another function then then only thing that you need to do, is to pass the right JSON like this:

``` JavaScript
{
	recaptcha: THE_RECAPTCHA_FROM_THE_FORM,
	secret: RE_CAPTCHA_SECRET
}
```

Bellow you can find a full example how to invoke the function that you can copy and paste.

``` JavaScript
//
//	1.	Create the object with the related data for the function
//
let data = {
	recaptcha: THE_RECAPTCHA_FROM_THE_FORM,
	secret: RE_CAPTCHA_SECRET
};

//
//	2.	Prepare the request configuration
//
var params = {
	FunctionName: 'reCAPTCHA',
	Payload: JSON.stringify(data, null, 2),
};

//
//	->	Invoke the Lambda Function
//
lambda.invoke(params, function(error, data) {

	//
	//	1.	Check if there was an error in invoking the fnction
	//
	if(error)
	{
		return reject(error);
	}

	//
	//	2.	Convert the payload to a JS object
	//
	let response = JSON.parse(data.Payload);

	//
	//  Add your own code here
	//

});
```

# IAM Role

For the function to work you'll need to create a Role with the following policies:

- AWSLambdaBasicExecutionRole

# The End

If you enjoyed this project, please consider giving it a 🌟. And check out our [0x4447 GitHub account](https://github.com/0x4447), where we have additional resources that you might find useful or interesting.

# For Hire 👨‍💻 👩‍💻

If you'd like us to help you with something, please feel free to say [hello@0x4447.email](mailto:hello@0x4447.email?Subject=Hello%20From%20Repo&Body=Hi%2C%0A%0AMy%20name%20is%20NAME%2C%20and%20I%27d%20like%20to%20get%20in%20touch%20with%20someone%20at%200x4447.%0A%0AI%27d%20like%20to%20discuss%20the%20following%20topics%3A%0A%0A-%20LIST_OF_TOPICS_TO_DISCUSS%0A%0ASome%20useful%20information%3A%0A%0A-%20My%20full%20name%20is%3A%20FIRST_NAME%20LAST_NAME%0A-%20My%20time%20zone%20is%3A%20TIME_ZONE%0A-%20My%20working%20hours%20are%20from%3A%20TIME%20till%20TIME%0A-%20My%20company%20name%20is%3A%20COMPANY%20NAME%0A-%20My%20company%20website%20is%3A%20https%3A%2F%2F%0A%0ABest%20regards.), and share what's on your mind. We'll take a look, and try our best to help you. Or visit our website at: [0x4447.com](https://0x4447.com).
