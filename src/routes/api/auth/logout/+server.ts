/**
 * Handles POST requests to the '/api/auth/logout' endpoint to log out a user.
 * It clears the authentication token by setting the 'token' cookie to an empty value and
 * configuring it to expire immediately.
 * A successful response message is returned to indicate the user has been logged out.
 *
 * @param {Object} cookies - The cookies utility for manipulating cookies in the response.
 * @returns {Response} - A response object with a success message.
 */
export async function POST({ cookies }) {
	cookies.set('token', '', {
		path: '/',
		httpOnly: true,
		secure: false,
		sameSite: 'strict',
		maxAge: 0
	});

	return new Response(JSON.stringify({ message: 'Logged out successfully' }), {
		status: 200,
		headers: {
			'Content-Type': 'application/json'
		}
	});
}
