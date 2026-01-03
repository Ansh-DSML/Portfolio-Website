# Portfolio Backend API

Production-ready Express backend for portfolio website contact form.

## Features

- ✅ Secure HTTP headers (Helmet)
- ✅ CORS protection
- ✅ Rate limiting (5 requests/minute per IP)
- ✅ Input validation and sanitization
- ✅ XSS and injection protection
- ✅ Centralized error handling
- ✅ Clean, modular code structure
- ✅ Ready for MySQL integration
- ✅ Ready for n8n webhook integration

## Setup

1. Install dependencies:
```bash
npm install
```

2. Copy environment variables:
```bash
cp .env.example .env
```

3. Update `.env` with your configuration:
```env
PORT=5000
NODE_ENV=development
ALLOWED_ORIGIN=http://localhost:3000
```

4. Start the server:
```bash
# Development (with auto-reload)
npm run dev

# Production
npm start
```

## API Endpoint

### POST /api/contact

Submit a contact form message.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "reason": "Hiring / Job Opportunity",
  "message": "We would like to discuss a role."
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Message received successfully"
}
```

**Error Response (400/429/500):**
```json
{
  "success": false,
  "error": "Error message here"
}
```

## Validation Rules

- **name**: Required, 2-100 characters, sanitized
- **email**: Required, valid email format, lowercase
- **reason**: Required, must be one of:
  - "Hiring / Job Opportunity"
  - "Project Collaboration"
  - "Freelance / Contract Work"
  - "General Inquiry"
- **message**: Optional, max 2000 characters

## Security

- Rate limiting: 5 requests per minute per IP
- CORS: Only allows requests from configured origin
- Input sanitization: Protects against XSS and injection
- Body size limit: 10kb maximum
- Secure headers: Helmet.js configured

## Project Structure

```
server/
 ├── app.js                 # Express app configuration
 ├── server.js              # Server entry point
 ├── routes/
 │    └── contact.routes.js # Contact form routes
 ├── controllers/
 │    └── contact.controller.js # Contact form controller
 ├── middleware/
 │    ├── validateInput.js  # Input validation
 │    ├── rateLimiter.js    # Rate limiting
 │    └── errorHandler.js   # Error handling
 ├── config/
 │    └── cors.js           # CORS configuration
 ├── utils/
 │    └── sanitize.js       # Sanitization utilities
 └── .env.example           # Environment variables template
```

## Next Steps

1. **Add MySQL**: Database integration (see TODO comments in `contact.controller.js`)
2. **Add n8n Webhook**: Notification system (see TODO comments)
3. **Add Logging**: Implement proper logging service (Winston, Pino)
4. **Add Tests**: Unit and integration tests
5. **Add Monitoring**: Error tracking (Sentry, Rollbar)

## Development

The server runs on port 5000 by default (configurable via `.env`).

Health check endpoint: `GET /health`

## License

ISC

