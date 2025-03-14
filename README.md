# Test Assessment - Country Information and Holiday Calendar App


## Project Overview

### Backend:

**Tech Stack:**
- Node.js (Express.js)
- Typescript
- Database (MongoDB)

## API Endpoints

### 1. **Get Available Countries**
- **Route**: `GET /countries`
- **Description**: This endpoint returns a list of available countries.

### 2. **Get Country Info**
- **Route**: `GET /countries/:countryCode`
- **Description**: Retrieves detailed information about a specific country.
- **Returns**:
    - List of Border Countries.
    - Historical population data for the country, suitable for chart plotting.
    - A URL to the country’s flag image.

### 3. **Add National Holidays to User Calendar**
- **Route**: `POST /users/:userId/calendar/holidays`
- **Description**: Adds national holidays of a specific country to the user’s calendar.
- **Request Body**:
    ```json
    {
        "countryCode": "US",
        "year": 2025,
        "holidays": ["New Year's Day", "Independence Day"]
    }

## Project Setup with Docker

### 1. **Installation**

- Clone the repository.

- Install the dependencies:
    ```bash
    npm install
    ```
  
### 2. **Running the application**

- Run docker compose command
    ```bash
      docker-compose up --build
    ```


## Project Setup without Docker

### 1. **Installation**

- Clone the repository.

- Install the dependencies:
    ```bash
    npm install
    ```

### 2. **Running MongoDB Locally**

- If you don't have MongoDB installed locally, you need to install it.

- Change env DB_CONNECTION_STRING host to localhost.

### 3. **Running the Application**

- Start the server:
    ```bash
    npm run start
    ```

  This will start the application locally on `http://localhost:3000`.


### Example Use Case:

1. **Get Available Countries**:
    - Endpoint: `GET /countries`
    - Returns a list of available countries.

2. **Get Country Info for Ukraine**:
    - Endpoint: `GET /country/UA`
    - Returns border countries, population data, and flag URL for Ukraine.

3. **Add Holidays for a User**:
    - Endpoint: `POST /users/1/calendar/holidays`
    - Body:
      ```json
      {
        "countryCode": "UA",
        "year": 2025,
        "holidays": ["New Year's Day", "Independence Day"]
      }
      ```
    - Saves the selected holidays as events in the user’s calendar.

---