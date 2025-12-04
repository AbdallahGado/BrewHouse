# TODO: Fix Google Sign-In Redirect Issue in Production

## Problem

- Google sign-in redirects to localhost instead of production domain, causing crashes.
- NEXTAUTH_URL is set to http://localhost:3000, overriding the production domain.

## Solution

- Make NextAuth baseURL dynamic to use the correct domain based on the request.

## Tasks

- [ ] Modify `src/app/api/auth/[...nextauth]/route.ts` to add dynamic baseURL function.
- [ ] Test Google sign-in in development (should still work with localhost).
- [ ] Deploy to production and test Google sign-in (should redirect to production domain).
- [ ] If issues persist, check Vercel logs and adjust if needed.

## Notes

- In development, NEXTAUTH_URL is used if set.
- In production, if NEXTAUTH_URL is not set, it uses the request's host with correct protocol.
