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

If you enjoyed this repo, please consider giving it a 🌟. And check out our [0x4447 GitHub account](https://github.com/0x4447), where we have additional articles and tools that you might find interesting.

# For Hire 👨‍💻 👩‍💻

If you'd like us to help you with something, please feel free to say hello@0x4447.email, and share what's on your mind. We'll take a look, and try our best to help you. Or visit our website at: [0x4447.com](https://0x4447.com).
