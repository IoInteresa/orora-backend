# API

### Registration
```POST /user/registration```
#### Body
```
{
    "username": string (length 3-50),
    
    "email": string,
        Or
    "phonenumber": string (lenght 8-50),
    
    "password": string (lenght 6-20)
}
```
### Response
```
{
    "status": 201,
    "data": {
        "id": string
        "email": string
        "username": string
        "phonenumber": string
        "verified": boolean
        "active": boolean
    }
}
```
### Other responses
```
{
    "status": 409
    "data": "User already exists"
}
{
    "status": 422,
    "data": "Required fields are missing or invalid"
}
{
    "status": 500
    "data": "Unable to create user at the moment"
}
{
    "status": 500
    "data": "Internal server error"
}
```
&nbsp;
&nbsp;

### Send Verify Code

```POST user/send-verify-code```
#### Body
```
{
    "email": string,
        Or
    "phonenumber": string (lenght 8-20),
}
```
#### Response
```
{
    "status": 200
}
```
### Other responses
```
{
    "status": 404
    "data": "User not found"
}
{
    "status": 409
    "data": "User is already verified"
}
{
    "status": 422,
    "data": "Required fields are missing or invalid"
}
{
    "status": 500
    "data": "Unable to send email"
}
{
    "status": 500
    "data": "Unable to send SMS"
}
{
    "status": 500
    "data": "Unable to save verification code"
}
{
    "status": 500
    "data": "Internal server error"
}
```

&nbsp;
&nbsp;

### Verify

```POST user/verify```
#### Body
```
{
    "email": string,
        Or
    "phonenumber": string (lenght 8-20),
    "code": integer
}
```

#### Response
```
{
    "status": 200,
    "data": {
        "id": string,
        "email": string,
        "username": string,
        "phonenumber": string,
        "verified": boolean,
        "active": boolean
        "accessToken": string
    }
}
```
### Other responses
```
{
    "status": 400,
    "data": "Invalid verification code"
}
{
    "status": 404,
    "data": "User not found"
}
{
    "status": 404,
    "data": "Verification code not found"
}
{
    "status": 409,
    "data": "User is already verified"
}
{
    "status": 422,
    "data": "Required fields are missing or invalid"
}
{
    "status": 500,
    "data": "Unable to update user verification"
}
{
    "status": 500,
    "data": "Unable to generate token jwt"
}
{
    "status": 500
    "data": "Internal server error"
}
```

&nbsp;
&nbsp;

### Login

```POST user/login```
#### Body
```
{
    "email": string,
        Or
    "phonenumber": string (lenght 8-20),
    "password": string (lenght 6-20)
}
```

#### Response
```
{
    "status": 200,
    "data": {
        "id": string,
        "email": string,
        "username": string,
        "phonenumber": string,
        "verified": boolean,
        "active": boolean
        "accessToken": string
    }
}
```

### Other responses
```
{
    "status": 400,
    "data": "Invalid login credentials"
}
{
    "status": 403,
    "data": "User is not verified yet"
}
{
    "status": 404,
    "data": "User not found"
}
{
    "status": 422,
    "data": "Required fields are missing or invalid"
}
{
    "status": 500,
    "data": "Unable to generate token jwt"
}
{
    "status": 500
    "data": "Internal server error"
}
```

&nbsp;
&nbsp;

### Get User
```
GET /user
```
+ Bearer Auth Token

&nbsp;
#### Response
```
{
    "status": 200,
    "data": {
        "id": "1544e0a2-26d4-4290-bf9b-67092b3fdb86",
        "email": "esoftfullstack@gmail.com",
        "username": "tipok3",
        "phonenumber": "+01052341987",
        "verified": true,
        "active": true
    }
}
```

### Other responses
```
{
    "status": 404,
    "data": "User not found"
}
{
    "status": 500
    "data": "Internal server error"
}
```


&nbsp;
&nbsp;

### Change Password
```POST /user/change-password```
+ Bearer Auth Token

#### Body
```
{
    "oldPassword": string (lenght 6-20)
    "newPassword": string (lenght 6-20)
}
```

#### Response
```
{
    "status": 200
}
```

### Other responses
```
{
    "status": 400,
    "data": "Invalid login credentials"
}
{
    "status": 403,
    "data": "User is not verified yet"
}
{
    "status": 404,
    "data": "User not found"
}
{
    "status": 422,
    "data": "Required fields are missing or invalid"
}
{
    "status": 500,
    "data": "Unable to change password"
}
{
    "status": 500
    "data": "Internal server error"
}

```


&nbsp;
&nbsp;

### Create Download History
```POST /download/create```
+ Bearer Auth Token

#### Body
```
{
    "title": string (minLength 3)
    "format": string
    "size": number
    "url": string (minLength 5)
}
```

#### Response
```
{
    "status": 201,
    "data": {
        "id": string,
        "title": string,
        "format": string,
        "size": string,
        "url": string,
        "thumbnailUrl": string,
        "createdAt": Date
    }
}
```

### Other responses
```
{
    "status": 403,
    "data": "User is not verified yet"
}
{
    "status": 404,
    "data": "User not found"
}
{
    "status": 422,
    "data": "Required fields are missing or invalid"
}
{
    "status": 500,
    "data": "Unable to create download"
}
{
    "status": 500
    "data": "Internal server error"
}
```

&nbsp;
&nbsp;

### Get Downloads History
```POST /download```
+ Bearer Auth Token

#### Body
```
{
    "page": number
    "limit": number
}
```

#### Response
```
{
    "status": 200,
    "data": {
        "data": [
            {
                "id": string,
                "title": string,
                "format": string,
                "size": string,
                "url": string,
                "thumbnailUrl": string,
                "createdAt": Date
            }
            ...
        ],
        "total": number,
        "page": number,
        "limit": number
    }
}
```

### Other responses
```
{
    "status": 403,
    "data": "User is not verified yet"
}
{
    "status": 404,
    "data": "User not found"
}
{
    "status": 422,
    "data": "Required fields are missing or invalid"
}
{
    "status": 500
    "data": "Internal server error"
}
```

&nbsp;
&nbsp;

### Delete Download History
```POST /download```
+ Bearer Auth Token

#### Body
```
{
    "id": string
}
```

#### Response
```
{
    "status": 200
}
```

### Other responses
```
{
    "status": 403,
    "data": "User is not verified yet"
}
{
    "status": 404,
    "data": "User not found"
}
{
    "status": 404,
    "data": "Download not found"
}
{
    "status": 422,
    "data": "Required fields are missing or invalid"
}
{
    "status": 500
    "data": "Unable to delete download"
}
{
    "status": 500
    "data": "Internal server error"
}
```