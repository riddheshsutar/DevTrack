# 🚀 DevTrack Setup Guide

## Quick Start Instructions

### Step 1: Database Setup (Required)

#### Option A: Using MySQL Command Line
```bash
# 1. Start MySQL service (if not already running)
# Windows: Start MySQL service from Services or MySQL Workbench
# Mac/Linux: sudo service mysql start

# 2. Connect to MySQL
mysql -u root -p
# (Enter your MySQL password when prompted, or just press Enter if no password)

# 3. Create database and tables
CREATE DATABASE devtrack;
USE devtrack;

# 4. Copy and paste the contents of database/schema.sql
# Or run: source C:/path/to/DevTrack/database/schema.sql
```

#### Option B: Using MySQL Workbench
1. Open MySQL Workbench
2. Connect to your local MySQL server
3. Create a new schema named `devtrack`
4. Open `database/schema.sql` and execute it

### Step 2: Configure Database Connection

Edit `backend/.env` file with your MySQL credentials:

```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=devtrack
DB_PORT=3306
```

**Common Configurations:**
- **No password**: Leave `DB_PASSWORD=` empty
- **With password**: Set `DB_PASSWORD=your_password`
- **Different user**: Change `DB_USER=your_username`

### Step 3: Start the Application

#### Terminal 1 - Backend Server
```bash
cd backend
npm run dev
```
✅ Should see: "🚀 DevTrack server is running on port 5000"

#### Terminal 2 - Frontend Server
```bash
cd frontend
npm start
```
✅ Should open browser at: http://localhost:3000

### Step 4: Verify Everything Works

1. **Backend Health Check**: http://localhost:5000/api/health
2. **API Tasks**: http://localhost:5000/api/tasks
3. **Frontend App**: http://localhost:3000

## 🔧 Troubleshooting

### Common Database Issues

#### Error: "Access denied for user 'root'@'localhost'"
**Solutions:**
1. Check your MySQL password in `.env` file
2. Try with empty password: `DB_PASSWORD=`
3. Reset MySQL root password if needed

#### Error: "Database 'devtrack' doesn't exist"
**Solutions:**
1. Create database: `CREATE DATABASE devtrack;`
2. Run the schema: Copy contents of `database/schema.sql`

#### Error: "connect ECONNREFUSED"
**Solutions:**
1. Start MySQL service
2. Check if MySQL is running on port 3306
3. Verify DB_HOST and DB_PORT in `.env`

### MySQL Service Commands

**Windows:**
- Start: `net start mysql80` (or your MySQL version)
- Stop: `net stop mysql80`

**Mac:**
```bash
brew services start mysql
brew services stop mysql
```

**Linux:**
```bash
sudo service mysql start
sudo service mysql stop
```

### Quick Database Setup Commands

```sql
-- Create database
CREATE DATABASE devtrack;
USE devtrack;

-- Create tasks table
CREATE TABLE tasks (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status ENUM('pending', 'in_progress', 'completed') DEFAULT 'pending',
    priority ENUM('low', 'medium', 'high') DEFAULT 'medium',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    due_date DATE NULL
);

-- Add sample data
INSERT INTO tasks (title, description, status, priority) VALUES
('Setup DevTrack', 'Configure and test the task management system', 'completed', 'high'),
('Create first task', 'Add your first development task', 'pending', 'medium');
```

## 🎯 What You Should See

### Successful Backend Startup:
```
🚀 DevTrack server is running on port 5000
📡 Health check: http://localhost:5000/api/health
📋 Tasks API: http://localhost:5000/api/tasks
```

### Successful Frontend Startup:
```
webpack compiled with warnings
Local:            http://localhost:3000
```

### Working Application:
- Beautiful gradient background
- Task management interface
- Filter buttons (All, Pending, In Progress, Completed)
- Create/Edit/Delete task functionality

## 📞 Need Help?

If you're still having issues:
1. Check that MySQL is installed and running
2. Verify database credentials in `backend/.env`
3. Ensure both servers are running on different ports
4. Check console for any error messages

---

**DevTrack** - Your development tasks, organized! 🚀 