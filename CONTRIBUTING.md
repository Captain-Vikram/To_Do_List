# Contributing to Todo List App

Thank you for considering contributing to the Todo List App! We welcome contributions from everyone.

## 🚀 Getting Started

### Prerequisites
- Node.js 18.x or later
- npm, yarn, pnpm, or bun
- Git

### Setting Up the Development Environment

1. **Fork the repository**
   ```bash
   # Click the "Fork" button on GitHub, then clone your fork
   git clone https://github.com/Captain-Vikram/To_Do_List.git
   cd To_Do_List
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open the application**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🛠️ Development Guidelines

### Code Style
- Follow the existing TypeScript and React patterns
- Use functional components with hooks
- Implement proper TypeScript interfaces
- Follow the component structure outlined in the README
- Use Tailwind CSS for styling
- Ensure responsive design principles

### State Management
- Use Redux Toolkit for global state management
- Keep reducers pure and focused
- Handle async operations properly
- Maintain proper TypeScript integration

### Testing
- Write tests for new features
- Ensure existing tests pass
- Test responsive design on multiple devices
- Test both light and dark modes

## 📝 Making Changes

### Branch Naming
- Feature branches: `feature/description`
- Bug fixes: `fix/description`
- Documentation: `docs/description`

### Commit Messages
Follow conventional commit format:
- `feat: add new feature`
- `fix: resolve bug`
- `docs: update documentation`
- `style: formatting changes`
- `refactor: code refactoring`
- `test: add or update tests`

### Pull Request Process

1. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Follow the coding standards
   - Add appropriate tests
   - Update documentation if needed

3. **Test your changes**
   ```bash
   npm run dev
   npm run build
   npm run lint
   ```

4. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add your feature description"
   ```

5. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Create a Pull Request**
   - Provide a clear description of changes
   - Include screenshots for UI changes
   - Reference any related issues

## 🐛 Reporting Issues

When reporting issues, please include:
- Clear description of the problem
- Steps to reproduce
- Expected vs actual behavior
- Browser/device information
- Screenshots (if applicable)

## 💡 Feature Requests

We welcome feature requests! Please:
- Check if the feature already exists
- Describe the feature clearly
- Explain the use case
- Consider implementation complexity

## 🎯 Areas for Contribution

- **New Features**: Task templates, recurring tasks, categories
- **UI/UX Improvements**: Animations, accessibility, mobile optimization
- **Performance**: Optimization for large task lists
- **Testing**: Unit tests, integration tests, e2e tests
- **Documentation**: Code comments, README improvements
- **Internationalization**: Multi-language support

## 🔧 Development Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint for code quality

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Redux Toolkit Documentation](https://redux-toolkit.js.org/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)

## 🤝 Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Help others learn and grow
- Focus on what's best for the community

## 📞 Questions?

If you have questions about contributing, feel free to:
- Open an issue for discussion
- Check existing issues and discussions
- Review the project documentation

Thank you for contributing to Todo List App! 🎉
