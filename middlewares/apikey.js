const ErrorHandler = require('../errors/ErrorHandler.js')

function apikeys(req,res,next) {
	const api_key = '12345';
	const user_entered_api_key = req.query.api_key;
	if ((user_entered_api_key) && (user_entered_api_key === api_key)) {
		next();
	} else {
		next(ErrorHandler.forbiddenToken());
	}
}

module.exports = apikeys;
