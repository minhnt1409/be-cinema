use cinema;

CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'user',
    avatar TEXT,
    fullname VARCHAR(255),
    birthday DATE,
    gender INT,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20)
);

CREATE TABLE cinemas (
    cinema_id INT AUTO_INCREMENT PRIMARY KEY,
    cinema_name VARCHAR(255) NOT NULL,
    cinema_address TEXT NOT NULL
);
CREATE TABLE movies (
    movie_id INT AUTO_INCREMENT PRIMARY KEY,
    movie_name VARCHAR(255) NOT NULL,
    movie_description TEXT,
    movie_trailer TEXT,
    movie_genres VARCHAR(255),
    movie_release DATE,
    movie_lenght TIME,
    movie_poster TEXT
);
CREATE TABLE room (
    room_id INT AUTO_INCREMENT PRIMARY KEY,
    cinema_id INT,
    room_name VARCHAR(255),
    FOREIGN KEY (cinema_id) REFERENCES cinemas(cinema_id) ON DELETE CASCADE
);
CREATE TABLE seats (
    seat_id INT AUTO_INCREMENT PRIMARY KEY,
    seat_type INT,
    seat_status VARCHAR(50) DEFAULT 'available',
    room_id INT,
    seat_row VARCHAR(10),
    number INT,
    FOREIGN KEY (room_id) REFERENCES room(room_id) ON DELETE CASCADE
);
CREATE TABLE schedule (
    schedule_id INT AUTO_INCREMENT PRIMARY KEY,
    cinema_id INT,
    movie_id INT,
    room_id INT,
    schedule_date DATE,
    schedule_start TIME,
    schedule_end TIME,
    booked_seat VARCHAR(100),
    holding_seat VARCHAR(100),
    FOREIGN KEY (cinema_id) REFERENCES cinemas(cinema_id) ON DELETE CASCADE,
    FOREIGN KEY (movie_id) REFERENCES movies(movie_id) ON DELETE CASCADE,
    FOREIGN KEY (room_id) REFERENCES room(room_id) ON DELETE CASCADE
);
CREATE TABLE ticket (
    ticket_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    schedule_id INT,
    seats_id VARCHAR(100),
    price DOUBLE,
    ticket_status VARCHAR(50) DEFAULT 'booked',
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (schedule_id) REFERENCES schedule(schedule_id) ON DELETE CASCADE
);