# Contributing to DevTrack

Thank you for your interest in contributing to DevTrack! This document provides guidelines and information for contributors.

## 🚀 Getting Started

### Prerequisites
- Node.js 14+
- MySQL 5.7+
- Git

### Development Setup
1. Fork the repository
2. Clone your fork: `git clone https://github.com/YOUR_USERNAME/devtrack.git`
3. Install dependencies: `npm install` in both `backend/` and `frontend/` directories
4. Set up your database using `database/schema.sql`
5. Configure environment variables in `backend/.env`

## 🎯 Project Structure

```
DevTrack/
├── backend/           # Express.js API server
├── frontend/          # React application
├── database/          # MySQL schema and setup
└── docs/             # Documentation
```

## 💻 Development Guidelines

### Code Style
- Use meaningful variable and function names
- Follow React functional component patterns
- Implement proper error handling
- Add comments for complex logic
- Maintain consistent indentation (2 spaces)

### Commit Messages
Use conventional commit format:
- `feat:` new features
- `fix:` bug fixes
- `docs:` documentation changes
- `style:` code style changes
- `refactor:` code refactoring
- `test:` adding tests
- `chore:` maintenance tasks

Example: `feat: add task priority filtering`

### Pull Request Process
1. Create a feature branch: `git checkout -b feature/your-feature-name`
2. Make your changes with appropriate tests
3. Update documentation if needed
4. Submit a pull request with a clear description

## 🧪 Testing

### Frontend Testing
```bash
cd frontend
npm test
```

### Backend Testing
```bash
cd backend
npm test
```

### Manual Testing
1. Start both servers
2. Test all CRUD operations
3. Verify responsive design
4. Check error handling

## 🐛 Bug Reports

When reporting bugs, please include:
- Operating system and version
- Node.js version
- MySQL version
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if applicable

## 🌟 Feature Requests

We welcome feature suggestions! Please:
- Check existing issues first
- Provide detailed use cases
- Explain the expected benefit
- Consider implementation complexity

## 📝 Documentation

Help improve our documentation:
- Fix typos and unclear explanations
- Add examples and use cases
- Improve setup instructions
- Create video tutorials

## 🏆 Recognition

Contributors will be:
- Listed in the README
- Mentioned in release notes
- Invited to join the core team (for significant contributions)

## 📞 Getting Help

- Create an issue for bugs or questions
- Join our discussions
- Reach out to maintainers

## 📄 Code of Conduct

Please note that this project is released with a Contributor Code of Conduct. By participating in this project you agree to abide by its terms.

---

Thank you for contributing to DevTrack! 🚀 