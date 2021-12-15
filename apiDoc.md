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
```http
  Authorization: Bearer token
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
#### Get one recipe

```http
  GET /recipe/recipeID
```
```http
  Authorization: Bearer token
```


| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `recipeID`      | `int` | **Required**. |

Response:

```json
{
  "recipeID": 22,
  "filename": "af790c1cd66c192ee00ad0d6a3fd3511",
  "title": "Joulukinkku",
  "user": "Joulupukki",
  "profilepic": "309db789d24e3dcc31a758dcd328c",
}
```
#### Add recipe

```http
  POST /recipe
```

```http
  Authorization: Bearer token
```

```http
  Content-type: multipart/form-data
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `header`     | `string` | **Required, min length 3** |
| `quantity` | `int` | **Required, min 1** |
| `unit`    | `string` | **Required, max 3** |
| `ingredient`       | `string` | **Required** |
| `description`       | `string` | **Required** |
| `time`       | `int` | **Required, min 1** |
| `category`       | `string` | **Required** |
| `picture`       | `file` | **Required, jpg, png, gif** |

Response:

```json
{
  "message": "Recipe added!",
  "recipeID": 3
}
```
