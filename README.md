
# AI Text Editor - EmpireUI Component

A powerful, AI-enhanced text editor component built for modern web applications. Features real-time text enhancement, tone adjustment, grammar checking, and intelligent writing assistance.

## 🚀 Features

- **Real-time AI Enhancement**: Get instant suggestions and improvements as you type
- **Multiple Tone Modes**: Switch between Professional, Casual, and Concise writing styles
- **Grammar & Style Checking**: AI-powered grammar and style suggestions
- **Export Functionality**: Copy to clipboard or download as text file
- **Responsive Design**: Works seamlessly across all device sizes
- **TypeScript Support**: Fully typed for better development experience
- **Customizable**: Extensive props for customization and theming

## 📦 Installation

```bash
# Install dependencies
npm install
# or
yarn install
# or
pnpm install
```

## 🎯 Usage

### Basic Usage

```tsx
import { AITextEditor } from '@/components/AITextEditor';

function App() {
  return (
    <AITextEditor
      placeholder="Start typing your text here..."
      onTextChange={(text) => console.log('Text changed:', text)}
    />
  );
}
```

### Advanced Usage with Custom Features

```tsx
import { AITextEditor } from '@/components/AITextEditor';

function AdvancedEditor() {
  const handleTextChange = (text: string) => {
    // Handle text changes
    console.log('Current text:', text);
  };

  return (
    <AITextEditor
      initialValue="Welcome to the AI Text Editor!"
      placeholder="Enter your text here..."
      minHeight="300px"
      maxHeight="600px"
      apiKey="your-openai-api-key" // For production use
      onTextChange={handleTextChange}
      features={{
        grammarCheck: true,
        toneAdjustment: true,
        autoComplete: true,
        summarization: true
      }}
      className="custom-editor-styles"
    />
  );
}
```

## 🔧 Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `initialValue` | `string` | `''` | Initial text content |
| `placeholder` | `string` | `'Start typing...'` | Placeholder text |
| `minHeight` | `string` | `'200px'` | Minimum editor height |
| `maxHeight` | `string` | `'400px'` | Maximum editor height |
| `apiKey` | `string` | `undefined` | AI service API key |
| `onTextChange` | `(text: string) => void` | `undefined` | Text change callback |
| `className` | `string` | `undefined` | Additional CSS classes |
| `features` | `FeatureConfig` | All enabled | Feature configuration |

### Feature Configuration

```tsx
interface FeatureConfig {
  grammarCheck?: boolean;
  toneAdjustment?: boolean;
  autoComplete?: boolean;
  summarization?: boolean;
}
```

## 🎨 Styling

The component uses Tailwind CSS and shadcn/ui components. It's fully customizable through:

- CSS classes via the `className` prop
- Tailwind utility classes
- CSS custom properties for theming
- shadcn/ui theme configuration

## 🤖 AI Integration

### Demo Mode
The component includes a demo mode with mock AI responses for development and testing.

### Production Integration
For production use, integrate with AI services:

```tsx
// Example with OpenAI
const aiEnhance = async (text: string, mode: string) => {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: `You are a writing assistant. ${getModePrompt(mode)}`
        },
        {
          role: 'user',
          content: text
        }
      ],
      temperature: 0.7,
      max_tokens: 1000
    }),
  });
  
  const data = await response.json();
  return data.choices[0].message.content;
};
```

## 🌟 Enhancement Modes

1. **Professional**: Makes text more formal and business-appropriate
2. **Casual**: Creates conversational and friendly tone
3. **Concise**: Reduces text length while maintaining meaning

## 📱 Responsive Design

The component is fully responsive and works across:
- Desktop (1024px+)
- Tablet (768px - 1023px)
- Mobile (320px - 767px)

## 🔧 Technical Stack

- **React 18+**: Modern React with hooks
- **TypeScript**: Full type safety
- **Tailwind CSS**: Utility-first styling
- **shadcn/ui**: High-quality UI components
- **Lucide React**: Beautiful icons
- **Radix UI**: Accessible primitives

## 🚀 Performance

- **Lazy Loading**: Components load only when needed
- **Debounced AI Calls**: Prevents excessive API requests
- **Optimized Re-renders**: Minimal re-rendering with proper memoization
- **Bundle Size**: Tree-shakeable imports for smaller bundles

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm test -- --coverage

# Run tests in watch mode
npm test -- --watch
```

## 📚 Examples

Check out the demo at `/` route to see the component in action with:
- Sample texts to try different enhancement modes
- Real-time feature demonstrations
- Integration examples

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Links

- [EmpireUI](https://github.com/empireui/empireui)
- [Documentation](https://empireui.dev)
- [Demo](https://your-demo-url.com)

## 💡 Roadmap

- [ ] Voice-to-text integration
- [ ] Multi-language support
- [ ] Advanced AI models integration
- [ ] Collaborative editing
- [ ] Plugin system for custom enhancements
- [ ] Analytics and insights dashboard

---

Built with ❤️ for the EmpireUI ecosystem
