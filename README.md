# CodeCanvas

Visit the live site: [CodeCanvas](http://jscode-canvas.vercel.app/)

CodeCanvas is a modern, web-based code editor that allows you to write and execute JavaScript code in real-time. Built with cutting-edge web technologies, it provides a seamless development experience with features like syntax highlighting, theme switching, and live code execution.

## Features

- 🔥 Real-time code execution
- 💡 Syntax highlighting
- 🌓 Light/Dark theme support
- ⌨️ Monaco Editor integration (same as VS Code)
- ⚡ Fast compilation and execution
- 📱 Responsive design
- ⚙️ Customizable editor settings
- 🔧 Web Worker-based code execution for safety

## Technology Stack

### Core Technologies
- **Next.js 14+** - React framework with App Router
- **TypeScript** - For type-safe code
- **React** - UI library
- **Tailwind CSS** - For styling

### Key Libraries and Tools
- **@monaco-editor/react** - VS Code's editor component
- **next-themes** - Theme management
- **Web Workers** - For safe code execution
- **Zustand** - State management

## Project Structure

```
src/
├── app/              # Next.js app router pages
├── components/       # React components
│   ├── ui/          # UI components
│   ├── CodeEditor   # Monaco editor wrapper
│   ├── Terminal     # Output terminal
│   └── ...
└── lib/             # Utilities and store
    ├── code-worker  # Web Worker for code execution
    ├── store        # Zustand store
    └── utils        # Helper functions
```

### Code Execution
CodeCanvas uses Web Workers to safely execute JavaScript code in a separate thread, preventing malicious code from affecting the main application.

### Editor Features
- Syntax highlighting
- Auto-completion
- Error highlighting
- Multiple theme support
- Custom keybindings (Ctrl/Cmd + S to run code)
- Adjustable font size
- Customizable editor settings

### Theme Support
The application supports both light and dark themes, automatically syncing with your system preferences while allowing manual override.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

[MIT License](LICENSE)

---

Built with ❤️ using Next.js and modern web technologies.

## Author

Built by Junaid Ahammed

Connect with me:
- GitHub: [JunaidAhammedU](https://github.com/JunaidAhammedU)
- LinkedIn: [Junaid Ahammed](https://www.linkedin.com/in/junaid-ahammed/)
