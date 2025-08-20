# AI Assistant Feature

This document provides instructions for setting up and using the AI Assistant feature implemented with Vercel's AI SDK v5.

## Overview

The AI Assistant is a conversational AI interface that helps website visitors learn about Shajeel's services, get pricing information, and understand how to start projects. It uses OpenAI's GPT-4 model with streaming responses for a real-time chat experience.

## Features

- 💬 **Real-time Chat**: Streaming AI responses with typing indicators
- 🎯 **Service Knowledge**: Comprehensive knowledge about all services offered
- 📱 **Mobile Responsive**: Works seamlessly on all devices
- 🎨 **Design Integration**: Matches the existing website theme
- 🔄 **Suggested Questions**: Helpful starter prompts for users
- ⚡ **Fast Responses**: Optimized for quick response times
- 🛡️ **Error Handling**: Graceful fallbacks when AI is unavailable

## Setup Instructions

### 1. Environment Configuration

Create or update `.env.local` in the project root:

```bash
# OpenAI API Key for AI Assistant
OPENAI_API_KEY=your_openai_api_key_here
```

To get an OpenAI API key:
1. Go to [OpenAI Platform](https://platform.openai.com/api-keys)
2. Create a new API key
3. Copy and paste it into your `.env.local` file

### 2. Dependencies

The required dependencies are already installed:

```json
{
  "ai": "^5.0.19",
  "@ai-sdk/openai": "^2.0.17",
  "@ai-sdk/react": "^2.0.19"
}
```

### 3. Usage

Once the API key is configured, the AI Assistant will be fully functional:

1. **Access**: Navigate to `/ai-assistant` or click the "AI Assistant" button in the header
2. **Interact**: Use suggested questions or type custom messages
3. **Navigate**: Use the "Back to Home" button to return to the main site

## File Structure

```
src/
├── app/
│   ├── ai-assistant/
│   │   └── page.tsx              # AI Assistant page component
│   └── api/
│       └── chat/
│           └── route.ts          # OpenAI API integration
└── components/
    ├── ai-assistant.tsx          # Main chat interface component
    └── ui/
        ├── input.tsx            # Input component
        └── scroll-area.tsx      # Scroll area component
```

## API Configuration

The AI Assistant API (`/api/chat`) is configured with:

- **Model**: GPT-4 Turbo (`gpt-4o`)
- **Temperature**: 0.7 (balanced creativity/consistency)
- **Streaming**: Real-time response streaming
- **Max Duration**: 30 seconds per request
- **System Prompt**: Comprehensive knowledge about services

## Customization

### Adding New Knowledge

Update the system prompt in `src/app/api/chat/route.ts` to add new information about:
- New services or offerings
- Updated pricing information
- Changed contact methods
- Additional expertise areas

### Modifying Suggested Questions

Edit the suggested questions in `src/components/ai-assistant.tsx`:

```tsx
const questions = [
  "What services does Shajeel offer?",
  "How much does a mobile app cost?",
  "Can you build AI chatbots?",
  "How do I get started with a project?"
];
```

### Styling Adjustments

The AI Assistant uses Tailwind CSS classes and follows the existing design system. Key styling areas:

- **Message bubbles**: Update in the message mapping section
- **Colors**: Uses existing theme variables
- **Spacing**: Follows the site's spacing scale
- **Typography**: Inherits from the main site theme

## Performance Considerations

- **Streaming**: Responses stream in real-time for better UX
- **Error Handling**: Graceful degradation when AI is unavailable
- **Loading States**: Clear indicators during processing
- **Memory**: Session-based conversation memory only

## Security

- **API Keys**: Stored securely in environment variables
- **Input Sanitization**: User inputs are properly validated
- **Rate Limiting**: Built into the AI SDK
- **No Data Storage**: Conversations are not persisted

## Troubleshooting

### Common Issues

1. **"AI service unavailable" error**:
   - Check that `OPENAI_API_KEY` is set in `.env.local`
   - Verify the API key is valid and has sufficient credits
   - Check internet connectivity

2. **Slow responses**:
   - Check OpenAI API status
   - Verify network connection
   - Consider adjusting the temperature or model

3. **Build errors**:
   - Ensure all dependencies are installed (`npm install`)
   - Check TypeScript compilation (`npm run build`)
   - Verify environment variables are properly formatted

### Debug Mode

To enable debug logging, add to `.env.local`:

```bash
NODE_ENV=development
```

## Browser Support

- **Chrome**: 90+
- **Firefox**: 90+
- **Safari**: 14+
- **Edge**: 90+
- **Mobile**: iOS Safari, Chrome Mobile

## Accessibility

The AI Assistant is built with accessibility in mind:

- **Keyboard Navigation**: Full keyboard support
- **Screen Readers**: Proper ARIA labels and structure
- **High Contrast**: Compatible with high contrast modes
- **Focus Management**: Clear focus indicators

## Future Enhancements

Potential improvements for future versions:

- **Voice Input**: Speech-to-text integration
- **File Uploads**: Document analysis capabilities
- **Multi-language**: Support for additional languages
- **Conversation History**: Persistent chat history
- **Advanced Analytics**: Detailed usage metrics

## Support

For technical issues or questions about the AI Assistant:

1. Check this documentation
2. Review the console for error messages
3. Verify environment configuration
4. Contact the development team

---

**Last Updated**: January 2025  
**Version**: 1.0.0  
**AI SDK Version**: v5.0.19