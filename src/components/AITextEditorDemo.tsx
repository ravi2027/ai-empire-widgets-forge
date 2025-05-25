
import React, { useState } from 'react';
import { AITextEditor } from './AITextEditor';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Lightbulb } from 'lucide-react';

export function AITextEditorDemo() {
  const [currentText, setCurrentText] = useState('');

  const sampleTexts = [
    "This is awesome text that needs to be more professional for business use.",
    "We need to utilize advanced methodologies to facilitate the implementation of our strategic objectives.",
    "In order to achieve success, we must work together due to the fact that teamwork is important at this point in time."
  ];

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-2">
          <Sparkles className="w-8 h-8 text-primary" />
          <h1 className="text-4xl font-bold">AI Text Editor</h1>
        </div>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Transform your writing with AI-powered enhancements. Get real-time suggestions, 
          tone adjustments, and intelligent text improvements.
        </p>
        <div className="flex items-center justify-center gap-2">
          <Badge variant="secondary">React Component</Badge>
          <Badge variant="secondary">TypeScript</Badge>
          <Badge variant="secondary">Tailwind CSS</Badge>
          <Badge variant="secondary">AI-Powered</Badge>
        </div>
      </div>

      {/* Demo Alert */}
      <Alert>
        <Lightbulb className="h-4 w-4" />
        <AlertDescription>
          This is a demo version using mock AI responses. In production, integrate with OpenAI GPT-4, 
          Anthropic Claude, or other AI providers for real enhancement capabilities.
        </AlertDescription>
      </Alert>

      {/* Main Editor */}
      <Card>
        <CardHeader>
          <CardTitle>Try the AI Text Editor</CardTitle>
          <CardDescription>
            Type or paste text below and use the enhancement modes to see AI-powered improvements.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AITextEditor
            initialValue="Welcome to the AI Text Editor! Try typing something or click one of the enhancement modes above to see the magic happen. This editor can help you improve tone, grammar, and style in real-time."
            onTextChange={setCurrentText}
            features={{
              grammarCheck: true,
              toneAdjustment: true,
              autoComplete: true,
              summarization: true
            }}
          />
        </CardContent>
      </Card>

      {/* Sample Texts */}
      <Card>
        <CardHeader>
          <CardTitle>Try These Sample Texts</CardTitle>
          <CardDescription>
            Click on any sample text below to load it into the editor and see how different enhancement modes work.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3">
            {sampleTexts.map((sample, index) => (
              <div
                key={index}
                className="p-4 border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={() => setCurrentText(sample)}
              >
                <p className="text-sm">{sample}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Features Overview */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Real-time Enhancements</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Get instant suggestions for grammar, style, and tone improvements as you type.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Multiple Tone Modes</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Switch between professional, casual, and concise writing styles with one click.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Export & Share</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Copy to clipboard or download your enhanced text as a file for easy sharing.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default AITextEditorDemo;
