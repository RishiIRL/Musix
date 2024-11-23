
# Musix - Music Streaming App

Musix is a music streaming web application built with React, Node.js, and MySQL. The app allows users to browse songs, manage playlists, and play their favorite tracks. Additionally, there is an admin panel where administrators can manage the music catalog.

## Features

- **User Login & Signup**: Allows users to log in and access their playlists and more.
- **Music Player**: Stream and control playback of songs directly in the app.
- **Song Library**: Browse and add songs to the library.
- **Admin Panel**: Admins can log in to manage the app and control music content.


## Technologies Used

- **Frontend**: React, React Router
- **Backend**: Node.js, Express
- **Database**: MySQL
- **Styling**: CSS
- **Authentication**: Simple login mechanism for users and admin

## Installation

To run this project locally, follow these steps:

### Prerequisites
- Node.js and npm installed on your machine.
- MySQL setup and running.

### Step-by-Step Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/RishiIRL/Musix.git
   cd Musix
   ```

2. **Install Backend Dependencies**:
   Navigate to the backend directory (if separate) and install dependencies:
   ```bash
   cd backend
   npm install
   ```

3. **Set up MySQL Database**:
   - Create a MySQL database named `musix`.
   - Run SQL scripts to set up the necessary tables.
   - Songs are not included in the repository, you can add them manually.
   - SQL code provided in this repository only includes create statements and to populate refer to the readme file in Database folder.

4. **Install Frontend Dependencies**:
   In the root directory of the project, install the frontend dependencies:
   ```bash
   npm install
   ```

5. **Configure the Backend**:
   Ensure that your `db.cjs` is set up with the correct MySQL configuration (host, username, password, etc.).

6. **Start the Application**:
   - Start the backend server:
     ```bash
     npm start
     ```
   - Start the frontend server:
     ```bash
     npm run dev
     ```

7. **Access the App**:
   - Open a browser and go to `http://localhost:5173` to use the app.

## Usage

1. **Login as a User**:
   - After logging in, browse and listen to songs in the library.
   - You can add songs to your playlist and like them.

2. **Login as Admin**:
   - Admin can log in with the credentials `username: admin` and `password: admin123`.
   - Admin can manage the music catalog and user accounts.

## Folder Structure

- `public/`: Contains static assets like images and icons.
- `src/`: Contains React components and related logic.
- `db.cjs`: Configuration for connecting to the MySQL database.

