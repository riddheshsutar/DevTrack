# Database Setup Instructions

## MySQL Database Setup for DevTrack

### Prerequisites
- MySQL Server (v5.7 or higher)
- MySQL Command Line Client or MySQL Workbench

### Step 1: Create Database
```sql
CREATE DATABASE devtrack;
USE devtrack;
```

### Step 2: Create Tables
Run the schema from `schema.sql`:
```bash
mysql -u your_username -p devtrack < schema.sql
```

Or copy and paste the SQL from `schema.sql` into your MySQL client.

### Step 3: Configure Backend
1. Navigate to the `backend` folder
2. Update the `.env` file with your MySQL credentials:
```
PORT=5000
DB_HOST=localhost
DB_USER=your_mysql_username
DB_PASSWORD=your_mysql_password
DB_NAME=devtrack
DB_PORT=3306
```

### Step 4: Test Connection
Start the backend server:
```bash
cd backend
npm run dev
```

If you see "🚀 DevTrack server is running on port 5000", the database connection is successful!

### Sample Data
The schema includes sample tasks to get you started. You can view them by:
```sql
SELECT * FROM tasks;
```

### Troubleshooting
- Make sure MySQL service is running
- Verify your credentials in the `.env` file
- Check if the database `devtrack` exists
- Ensure your MySQL user has proper permissions 