import React, { useState, useEffect } from 'react';
import { AITextEditor } from './AITextEditor';
import { WelcomePopup } from './WelcomePopup';
import { SettingsDialog } from './SettingsDialog';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Sparkles, Lightbulb, Palette, Zap, FileText } from 'lucide-react';

export function AITextEditorDemo() {
  const [currentText, setCurrentText] = useState('');
  const [showWelcome, setShowWelcome] = useState(false);

  // Show welcome popup on first visit
  useEffect(() => {
    const hasVisited = localStorage.getItem('ai-editor-visited');
    if (!hasVisited) {
      setShowWelcome(true);
      localStorage.setItem('ai-editor-visited', 'true');
    }
  }, []);

  const sampleTexts = [
    "This is awesome text that needs to be more professional for business use.",
    "We need to utilize advanced methodologies to facilitate the implementation of our strategic objectives.",
    "In order to achieve success, we must work together due to the fact that teamwork is important at this point in time."
  ];

  const handleSampleTextClick = (sample: string) => {
    setCurrentText(sample);
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-6">
      <WelcomePopup open={showWelcome} onClose={() => setShowWelcome(false)} />

      {/* Enhanced Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-2">
          <div className="p-3 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20">
            <Sparkles className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            AI Text Editor
          </h1>
        </div>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Transform your writing with AI-powered enhancements, beautiful color customization, 
          and intelligent text improvements.
        </p>
        <div className="flex items-center justify-center gap-2">
          <Badge variant="secondary" className="bg-blue-500/10 text-blue-700">React Component</Badge>
          <Badge variant="secondary" className="bg-purple-500/10 text-purple-700">TypeScript</Badge>
          <Badge variant="secondary" className="bg-green-500/10 text-green-700">Tailwind CSS</Badge>
          <Badge variant="secondary" className="bg-orange-500/10 text-orange-700">AI-Powered</Badge>
        </div>
        <div className="flex items-center justify-center gap-2">
          <Button 
            onClick={() => setShowWelcome(true)}
            variant="outline"
            className="gap-2"
          >
            <Sparkles className="w-4 h-4" />
            Show Welcome Guide
          </Button>
          <SettingsDialog />
        </div>
      </div>

      {/* Demo Alert */}
      <Alert className="border-blue-200 bg-blue-50/50">
        <Lightbulb className="h-4 w-4 text-blue-600" />
        <AlertDescription className="text-blue-800">
          This is a demo version using mock AI responses. In production, integrate with OpenAI GPT-4, 
          Anthropic Claude, or other AI providers for real enhancement capabilities.
        </AlertDescription>
      </Alert>

      {/* Main Editor */}
      <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-gray-50/50">
        <CardHeader className="bg-gradient-to-r from-blue-50/50 to-purple-50/50">
          <CardTitle className="flex items-center gap-2">
            <Palette className="w-5 h-5 text-primary" />
            Enhanced AI Text Editor
          </CardTitle>
          <CardDescription>
            Type or paste text below and use the enhancement modes to see AI-powered improvements.
            Customize colors and font size for a personalized experience.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <AITextEditor
            initialValue="Welcome to the Enhanced AI Text Editor! 🎨 Try typing something or click one of the enhancement modes above to see the magic happen. This editor can help you improve tone, grammar, and style in real-time, plus you can customize colors and font size!"
            onTextChange={setCurrentText}
            features={{
              grammarCheck: true,
              toneAdjustment: true,
              autoComplete: true,
              summarization: true,
              colorCustomization: true
            }}
          />
        </CardContent>
      </Card>

      {/* Sample Texts */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary" />
            Try These Sample Texts
          </CardTitle>
          <CardDescription>
            Click on any sample text below to load it into the editor and see how different enhancement modes work.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3">
            {sampleTexts.map((sample, index) => (
              <div
                key={index}
                className="p-4 border rounded-lg cursor-pointer hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-purple-50/50 transition-all duration-200 hover:shadow-md hover:scale-[1.02]"
                onClick={() => handleSampleTextClick(sample)}
              >
                <p className="text-sm">{sample}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Features Overview */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="hover:shadow-lg transition-shadow duration-200">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Zap className="w-5 h-5 text-yellow-500" />
              Real-time Enhancements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Get instant suggestions for grammar, style, and tone improvements as you type with AI assistance.
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow duration-200">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Palette className="w-5 h-5 text-purple-500" />
              Color Customization
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Personalize your writing experience with custom text colors, backgrounds, and font sizes.
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow duration-200">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-blue-500" />
              Export & Share
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Copy to clipboard or download your enhanced text as a file for easy sharing and collaboration.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default AITextEditorDemo;
