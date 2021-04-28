// const jwt = require('jsonwebtoken')
// // const User = require('../models/user')

// const auth = async (req, res, next) => {
//     try {
//         // const token = req.header('Authorization').replace('Bearer ', '')
//         // const decoded = jwt.verify(token, process.env.JWT_SECRET)
//         // const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })

//         // if (!user) {
//         //     throw new Error()
//         // }

//         // req.token = token
//         // req.user = user
//         next()
//     } catch (e) {
//         res.status(401).send({ error: 'Please authenticate.' })
//     }
// }

// module.exports = auth

const jwt = require('express-jwt')
const jwksRsa = require('jwks-rsa')

const checkJwt = jwt({
	secret: jwksRsa.expressJwtSecret({
		cache: true,
		rateLimit: true,
		jwksRequestsPerMinute: 5,
		jwksUri: `https://utahfishfinder.us.auth0.com/.well-known/jwks.json`,
	}),

	// Validate the audience and the issuer.
	audience: 'https://utah-fish-finder-api',
	issuer: `https://utahfishfinder.us.auth0.com/`,
	algorithms: ['RS256'],
})

module.exports = checkJwt
