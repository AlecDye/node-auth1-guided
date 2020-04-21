# Node Auth 1 Guided Project

Guided project for **Node Auth 1** Module.

## Prerequisites

- [SQLite Studio](https://sqlitestudio.pl/index.rvt?act=download) installed.

## Project Setup

- [ ] fork and clone this repository.
- [ ] **CD into the folder** where you cloned **your fork**.
- [ ] type `npm i` to download dependencies.
- [ ] type `npm run server` to start the API.

Please follow along as the instructor adds authentication to the API.

## Encryption vs Hashing

- for password storage use `hashing` (one way communication), `encryption` (uses two way communication). There is no easy way of getting the original hashed string back.

## Auth workflow

- register an account
- login
- logout
- restrict access to resources

## Tokens

The server does not store the information, the information is stored on the token. There is no session to destory.

### Server

- on successful login/register, produce and send the token to the client
- send token to client
- on following requests, verify the token
- if token is good, provide access, if not block access

### Client

- store the token (memory, local storage, header...)
- send the token on every request
- destory token on logout
