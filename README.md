  <h3 align="center">My User Book</h3>

  <p align="center">
    A basic NextJS App to perform authentication
    <br />
    <a href="https://myuserbook.vercel.app/">View Demo</a>
  </p>
</p>

## About The Project

This is basic web app based on NextJS to authorize users saved in MongoDB to upload there profile picture and render their address on the static map.

### Built With

Major frameworks and libraries:

- [NextJS](https://nextjs.org/)
- [React Hook Forms](https://react-hook-form.com/)
- [JOI](https://joi.dev/)

## Getting Started

To get a local copy up and running follow these simple example steps.

### Prerequisites

You need to have these free APIs keys in your .env.local file:

- [Cloundinary](https://cloudinary.com/) -> to save uploaded images on the cloud
  ```sh
  CLOUDINARY_URL= cloudinary://...
  ```
- [Position Stack](https://positionstack.com/)-> to get coordinates of a address
  ```sh
  CORDS_KEY= positionstack api key...
  ```
- [Mapbox](https://www.mapbox.com/)-> to render a static map from the coordinates

  ```sh
  MAPBOX_KEY=mapbox api key
  ```

  You also need to set MongoDB URL in your .env.local file:

- ```sh
  MONGODB_URI=MONGO_DB_URI_WITH_DEFAULT_DATABASE
  ```

And, the last thing is to set JWT Key (any key):

- JWT Authentication Key
  ```sh
  JWT_KEY=MyJWTKey
  ```

_you can rename '.env.local.txt'_ to _'.env.local'_

### Installation

1. Get your keys ready
2. Clone the repo
   ```sh
   git clone https://github.com/parmdhillon/myuserbook.git
   ```
3. Install NPM packages
   ```sh
   npm install
   ```
4. Update your keys in `.env.local`

5. Run the project @ localhost:3000
   ```sh
   npm run dev
   ```
