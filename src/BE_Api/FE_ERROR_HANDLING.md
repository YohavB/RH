## FE Error Handling Guide

### Error Schema
All backend errors return:
```json
{
  "code": "ERROR_TYPE",
  "message": "Human-friendly error message",
  "status": 422
}
```

### ErrorType values
Key values you may encounter:
- AUTHENTICATION → 401
- INVALID_JWT → 422
- CORRUPTED_DATA → 422
- INVALID_INPUT → 422
- DB_ACCESS → 422
- RESOURCE_ALREADY_EXISTS → 409
- RESOURCE_NOT_EXISTS → 404
- ENTITY_NOT_FOUND → 404
- BAD_CREDENTIAL → 403
- USER_CONSENT_REQUIRED → 403
- HTTP_CALL → 500
- UNKNOWN → 500

### Client handling patterns
- If status is 401 (AUTHENTICATION): trigger refresh google token and retry login to server
- If code is USER_CONSENT_REQUIRED: show consent UI then retry login with agreedConsent=true
- For other codes: show generic error "Sorry, something went wrong. Please try again."

### Examples

TypeScript fetch wrapper:
```ts
async function request(input: RequestInfo, init?: RequestInit) {
  const res = await fetch(input, init);
  if (!res.ok) {
    const err: { code: string; message: string; status: number } = await res.json();
    throw err;
  }
  return res.json();
}
```

Handling consent flow:
```ts
try {
  await request('/api/v1/auth/google', { method: 'POST', body: JSON.stringify({ token }) });
} catch (e: any) {
  if (e.code === 'USER_CONSENT_REQUIRED') {
    const agreed = await showConsentModal();
    if (agreed) {
      const url = new URL('/api/v1/auth/google', location.origin);
      url.searchParams.set('agreedConsent', 'true');
      await request(url.toString(), { method: 'POST', body: JSON.stringify({ token }) });
    }
  } else {
    showToast(e.message || 'Something went wrong');
  }
}
```

