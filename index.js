let request = require('request');

//
//  This AWS Lambda is responsabile for validating a Google reCaptch chalange.
//
//  The return value will contain a string that is either true or false.
//
exports.handler = async (event) => {

	//
	//	1.	The object used to pass the data around promises
	//
	let container = {
		request: {
		    recaptcha: event.recaptcha,
		    secret: event.secret
		},
		response: true
	};

	//
	//	->	Start the chain
	//
	try
	{
		container = await check_the_recaptcha(container);
	}
	catch(error)
	{
        //
        //  1.  Create a message to send back
        //
        let message = {
            message: error.message || error
        };

		//
		//  2.  Create the response
		//
		let response = {
			statusCode: error.status || 500,
			body: JSON.stringify(message, null, 4)
		};

		//
		//  ->  Tell lambda that we finished
		//
		return response;
	}

	//
	//	->	Return a positive response
	//
	return container.response;

};

//  _____    _____     ____    __  __   _____    _____   ______    _____
// |  __ \  |  __ \   / __ \  |  \/  | |_   _|  / ____| |  ____|  / ____|
// | |__) | | |__) | | |  | | | \  / |   | |   | (___   | |__    | (___
// |  ___/  |  _  /  | |  | | | |\/| |   | |    \___ \  |  __|    \___ \
// | |      | | \ \  | |__| | | |  | |  _| |_   ____) | | |____   ____) |
// |_|      |_|  \_\  \____/  |_|  |_| |_____| |_____/  |______| |_____/
//

//
//	Make a request to Google with the data that we got back from the
//	front-end to see if the reCaptcha actually worked
//
function check_the_recaptcha(container)
{
	return new Promise(function(resolve, reject) {

		//
		//	1.	Create the request
		//
		let options = {
			url: "https://www.google.com/recaptcha/api/siteverify",
			json: true,
			form: {
				response: container.request.recaptcha,
				secret: container.request.secret
			}
		};

		//
		// 	2.	Ask uncle Google if we are dealing with a human or not.
		//
		request.post(options, function(req_error, response, google) {

			//
			//	1.	Check if there was an internal error
			//
			if(req_error)
			{
			    //
			    //  1.  Log the error so we can find out what went wrong
			    //
			    console.log(req_error);

			    //
			    //  2.  Set the response to a negative value
			    //
				container.response = false;
			}

			//
			//	2.	Check what Google think of the user.
			//
			if(!google.success)
			{
			    //
			    //  1.  Set the response to a negative value
			    //
				container.response = false;
			}

			//
			//	->	Move to the next chain
			//
			return resolve(container);

		});

	});
}