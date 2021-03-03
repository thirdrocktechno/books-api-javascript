# Books-api

## Running Locally

### Prerequisities

-   **NodeJS**: v12.20.1 or higher
-   **MongoDB**: v4.2.1 or higher
-   **Docker**: 20.10.4

### Using manual download ZIP

1.  Download repository
2.  Uncompress to your desired directory

### Set environment variables
Create .env file inside the root directory and add below default variables in the .env file.

```
NODE_ENV=local
MONGO_URL=mongodb://mongo:27017/book-db-dev
PORT=1338
JWT_SECRET=bA2xcjpf8y5aSUFsNB2qN5yymUBSs6es3qHoFpGkec75RCeBb8cpKauGefw5qy4
JWT_EXPIRATION_INTERVAL=7
```

### Create a docker build using this command
If mongo is running on system, need to stop.

```sh
$  docker-compose -f docker-compose.yml build
```

### To start the server execute below command.
```sh
$  docker-compose -f docker-compose.yml up
```

```
Connected to MongoDB
Listening to port 1338

Press CTRL + C to stop the process.
```

### Add authors and books using seeder

Go inside container using container name

```sh
$  docker exec -it nodejs bash
```

### Once you are in the container, please execute below command,
```
$ npm run seeder
```

**Note:**  Your app should now be running on [localhost:1338](http://localhost:1338/).

### REST API testing in Swagger!

You can test all rest APIs with swagger [localhost:1338/docs](http://localhost:1338/v1/docs) url.
 
All the books api are only available for logged in users. please use  below credentials

```
User 1
email: gautam@gmail.com
password: Admin@123

User 2
email: jenish@gmail.com
password: Admin@123
```
### Step 1: Execute login api.
![image of step 1.1](https://alexa-attendance-python.s3.amazonaws.com/step-1.1.png)

![image of step 1.2](https://alexa-attendance-python.s3.amazonaws.com/step-1.2.png)

### Step 2: set access token
![image of step 2.1](https://alexa-attendance-python.s3.amazonaws.com/step-2.1.png)

![image of step 2.2](https://alexa-attendance-python.s3.amazonaws.com/step-2.2.png)

### Step 3: Get all books.

![image of step 3](https://alexa-attendance-python.s3.amazonaws.com/step-3.png)
