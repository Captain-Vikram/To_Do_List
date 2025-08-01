# Todo List App

[![CI/CD Pipeline](https://github.com/yourusername/todo-list-app/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/yourusername/todo-list-app/actions/workflows/ci-cd.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-15-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4-38B2AC)](https://tailwindcss.com/)

A modern, responsive Todo List application built with Next.js, Redux Toolkit, TypeScript, and Tailwind CSS.

![Todo List App Screenshot](https://via.placeholder.com/800x400/1f2937/ffffff?text=Todo+List+App+Demo)

## 🌟 Live Demo

🔗 **[View Live Demo](https://your-todo-app.vercel.app)** *(Replace with your actual deployment URL)*

## 🚀 Features

### Core Features
- ✅ **Add New Tasks** - Create tasks with title, description, due date, priority, and status
- ✏️ **Edit Tasks** - Modal-based editing with pre-filled forms
- 🗑️ **Delete Tasks** - Confirmation dialog for safe deletion
- 🔍 **Real-time Search** - Search tasks by title or description
- 🏷️ **Filter Tasks** - Filter by status (All, Pending, In Progress, Completed) and priority (All, Low, Medium, High)
- 📊 **Sort Tasks** - Sort by due date, priority, or creation time (ascending/descending)
- 📱 **Responsive Design** - Optimized for desktop, tablet, and mobile devices
- 🔔 **Toast Notifications** - Clear feedback for all actions

### Bonus Features
- 🌙 **Dark Mode Toggle** - Switch between light and dark themes
- 📋 **Task Grouping** - Group tasks by status for better organization
- 📈 **Task Statistics** - Visual dashboard showing task counts by status
- ⚡ **Bulk Actions** - Mark all tasks as completed or clear completed tasks

## 🛠️ Tech Stack

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Redux Toolkit** - State management with TypeScript integration
- **Tailwind CSS** - Utility-first CSS framework
- **React Hot Toast** - Toast notifications
- **date-fns** - Date formatting and validation

## 📁 Project Structure

```
src/
├── app/
│   ├── globals.css          # Global styles and Tailwind configuration
│   ├── layout.tsx           # Root layout with Redux provider
│   └── page.tsx             # Main application page
├── components/
│   ├── ConfirmDialog.tsx    # Confirmation dialog component
│   ├── Modal.tsx            # Reusable modal component
│   ├── TaskForm.tsx         # Task creation/editing form
│   ├── TaskItem.tsx         # Individual task component
│   └── TaskList.tsx         # Task list with grouping support
├── slices/
│   └── taskSlice.ts         # Redux slice for task management
├── store/
│   └── store.ts             # Redux store configuration
├── types/
│   └── index.ts             # TypeScript interfaces and enums
└── utils/
    └── taskUtils.ts         # Utility functions for filtering, sorting, validation
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18.x or later
- npm, yarn, pnpm, or bun

### Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Run the development server**
   ```bash
   npm run dev
   ```

3. **Open the application**
   Navigate to [http://localhost:3000](http://localhost:3000) in your browser

## 🎯 Usage

### Adding Tasks
1. Click the "Add Task" button in the top right
2. Fill in the task details:
   - **Title** (required)
   - **Description** (optional)
   - **Due Date** (optional)
   - **Priority** (Low, Medium, High)
   - **Status** (Pending, In Progress, Completed)
3. Click "Add Task" to create

### Managing Tasks
- **Edit**: Click the edit icon on any task
- **Delete**: Click the delete icon and confirm
- **Quick Status Change**: Use the status dropdown on each task
- **Search**: Use the search bar to find tasks by title or description
- **Filter**: Use the status and priority filters
- **Sort**: Choose sort criteria and toggle ascending/descending order

### Views
- **List View**: Default view showing all tasks
- **Grouped View**: Toggle "Group by status" to organize tasks by status columns

### Dark Mode
Click the sun/moon icon in the top right to toggle between light and dark themes.

## 🧩 Key Components

### State Management
- **Redux Toolkit** with TypeScript for predictable state updates
- **Centralized store** with task slice managing all task operations
- **Optimistic updates** with proper error handling

### Form Validation
- **Required field validation** (title)
- **Character limits** (title: 100 chars, description: 500 chars)
- **Date validation** with proper error messages
- **Real-time validation** with user feedback

### Responsive Design
- **Mobile-first approach** with Tailwind CSS
- **Flexible grid layouts** that adapt to screen size
- **Touch-friendly interfaces** for mobile devices
- **Optimized typography** and spacing

## 🔧 Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🎨 Design Decisions

### Approach
Built with a **component-driven architecture** emphasizing reusability and maintainability. The application uses **Redux Toolkit** to simplify state management while maintaining type safety with TypeScript. The UI prioritizes **user experience** with immediate feedback, smooth animations, and intuitive interactions.

### Challenges Solved
- **State synchronization** between components using Redux
- **Form validation** with real-time feedback
- **Responsive design** across various device sizes
- **Dark mode implementation** with proper theme switching
- **Performance optimization** for large task lists

### Architecture Decisions
- **Modular component structure** for easy maintenance
- **TypeScript interfaces** for data consistency
- **Utility functions** for business logic separation
- **CSS custom properties** for theme management

## 🚀 Performance Features

- **Memoized components** to prevent unnecessary re-renders
- **Optimized filtering and sorting** with useMemo
- **Efficient state updates** with Redux Toolkit
- **Responsive design** with Tailwind CSS

## 🔐 Error Handling

- **Form validation** with user-friendly error messages
- **Toast notifications** for operation feedback
- **Input sanitization** and validation
- **Proper TypeScript types** for runtime safety

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details on how to get started.

### Quick Start for Contributors
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔒 Security

For security concerns, please review our [Security Policy](SECURITY.md).

## 🐛 Issues & Support

- 🐛 **Bug Reports**: Use our [Bug Report Template](.github/ISSUE_TEMPLATE/bug_report.md)
- 💡 **Feature Requests**: Use our [Feature Request Template](.github/ISSUE_TEMPLATE/feature_request.md)
- 💬 **Discussions**: Use GitHub Discussions for questions and ideas

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing React framework
- [Redux Toolkit](https://redux-toolkit.js.org/) for simplified state management
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [React Hot Toast](https://react-hot-toast.com/) for beautiful notifications

---

Built with ❤️ using Next.js, Redux Toolkit, TypeScript, and Tailwind CSS
