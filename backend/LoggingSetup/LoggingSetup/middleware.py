import logging
import json

logger = logging.getLogger(__name__)

class APILoggingMiddleware:
    SENSITIVE_FIELDS = ['password', 'credit_card']

    def __init__(self, get_response):
        self.get_response = get_response

    def mask_sensitive_data(self, data):
        for field in self.SENSITIVE_FIELDS:
            if field in data:
                data[field] = '*****'  # Masking sensitive fields
        return data

    def __call__(self, request):
        # Logging request details
        logger.info("API Request: %s %s", request.method, request.get_full_path())

        # Masking sensitive data in the request payload
        masked_data = self.mask_sensitive_data(request.data.copy())
        logger.info("Request Data: %s", json.dumps(masked_data))

        response = self.get_response(request)

        # Logging response details
        logger.info("API Response: %s", response.status_code)

        return response
