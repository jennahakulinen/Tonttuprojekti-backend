# COOKMAS REST API

Api for Cookmas app.

## API Reference v.0.1

#### Login

```http
  POST /auth/login
```

```http
  Content-type: application/json
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `username` | `string` | **Required** |
| `password`    | `string` | **Required** |

Response:

```json
{
  "Username": "Joulupukki",
  "Email": "joulu.pukki@korvatunturi.fi",
  "Password": "$2a$12$kVUpRoU.nMpVorM9E2ZfJuk1aupdB1MQIiIrLQG99hQ1N2q2BwDre",
  "Hometown": "Rovaniemi",
  "ProfilePic": "309db789d24e3dcc31a758dcd328c91c",
  "Role": 1
}

```

#### Register 

```http
  POST /auth/register
```

```http
  Content-type: application/json
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `email`     | `email` | **Required, email** |
| `username` | `string` | **Required, min length 3** |
| `city`    | `string` | **Required, min length 3** |
| `password`    | `string` | **Required, min length 8 characters, at least one capital letter** |
| `filename`    | `file` | **Required, jpg, png, gif** |

Response:

```json
{
  "email": "joulutonttu@tonttu.fi",
  "username": "JouluTonttu",
  "city": "Rovaniemi",
}
```
