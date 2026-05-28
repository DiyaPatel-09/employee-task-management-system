CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);



CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    status VARCHAR(50) DEFAULT 'Pending',
    priority VARCHAR(20) NOT NULL,
    due_date DATE NOT NULL,
    employee_id INTEGER REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE task_updates (
    id SERIAL PRIMARY KEY,
    task_id INTEGER REFERENCES tasks(id) ON DELETE CASCADE,
    updated_by INTEGER REFERENCES users(id),
    status VARCHAR(50) NOT NULL,
    progress_notes TEXT,
    completion_remarks TEXT,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
); 

CREATE TABLE projects(
id SERIAL PRIMARY KEY,
name VARCHAR(100) NOT NULL,
description TEXT,
status VARCHAR(30) DEFAULT 'Planning',
start_date DATE,
end_date DATE,
created_by INT REFERENCES users(id),
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
); 

ALTER TABLE tasks
ADD COLUMN project_id INT REFERENCES projects(id);

CREATE TABLE project_members(
id SERIAL PRIMARY KEY,
project_id INT REFERENCES projects(id) ON DELETE CASCADE,
employee_id INT REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE notifications(
id SERIAL PRIMARY KEY,
user_id INT REFERENCES users(id) ON DELETE CASCADE,
message TEXT NOT NULL,
is_read BOOLEAN DEFAULT FALSE,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE activity_logs(
id SERIAL PRIMARY KEY,
user_id INT REFERENCES users(id) ON DELETE CASCADE,
action VARCHAR(255),
project_id INT REFERENCES projects(id) ON DELETE SET NULL,
task_id INT REFERENCES tasks(id) ON DELETE SET NULL,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE comments(
id SERIAL PRIMARY KEY,
task_id INT REFERENCES tasks(id) ON DELETE CASCADE,
user_id INT REFERENCES users(id) ON DELETE CASCADE,
comment TEXT NOT NULL,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE tasks
ADD COLUMN estimated_hours INT;

ALTER TABLE tasks
ADD COLUMN actual_hours INT DEFAULT 0;

ALTER TABLE tasks
ADD COLUMN attachment VARCHAR(255);

ALTER TABLE tasks
ADD COLUMN is_archived BOOLEAN
DEFAULT FALSE;

ALTER TABLE comments
ADD COLUMN attachment TEXT;

ALTER TABLE users
ADD COLUMN is_deleted
BOOLEAN
DEFAULT FALSE;



SELECT * FROM users;
SELECT * FROM tasks;
SELECT * FROM task_updates;
SELECT * FROM projects;
SELECT * FROM project_members;
SELECT * FROM notifications;
SELECT * FROM activity_logs;
SELECT * FROM comments;
