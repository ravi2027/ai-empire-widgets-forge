
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FloatingAIEditor } from './FloatingAIEditor';
import { WelcomePopup } from './WelcomePopup';
import { 
  Sparkles, 
  Edit3, 
  Wand2, 
  FileText, 
  Palette, 
  Zap,
  ArrowRight,
  Star,
  Users,
  Clock
} from 'lucide-react';

export function HomePage() {
  const [editorOpen, setEditorOpen] = useState(false);
  const [welcomeOpen, setWelcomeOpen] = useState(false);

  const features = [
    {
      icon: <Wand2 className="w-6 h-6 text-blue-500" />,
      title: "AI Enhancement",
      description: "Transform your text with professional, casual, or concise AI modes",
      color: "from-blue-500/10 to-blue-600/10"
    },
    {
      icon: <Palette className="w-6 h-6 text-purple-500" />,
      title: "Color Customization",
      description: "Personalize your writing experience with custom colors and themes",
      color: "from-purple-500/10 to-purple-600/10"
    },
    {
      icon: <Zap className="w-6 h-6 text-yellow-500" />,
      title: "Real-time Suggestions",
      description: "Get instant grammar and style improvements as you type",
      color: "from-yellow-500/10 to-yellow-600/10"
    },
    {
      icon: <FileText className="w-6 h-6 text-green-500" />,
      title: "Export & Share",
      description: "Copy to clipboard or download your enhanced text easily",
      color: "from-green-500/10 to-green-600/10"
    }
  ];

  const stats = [
    { icon: <Users className="w-5 h-5" />, label: "Active Users", value: "10K+" },
    { icon: <FileText className="w-5 h-5" />, label: "Documents Created", value: "50K+" },
    { icon: <Clock className="w-5 h-5" />, label: "Time Saved", value: "1000+ hrs" },
    { icon: <Star className="w-5 h-5" />, label: "User Rating", value: "4.9/5" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <WelcomePopup open={welcomeOpen} onClose={() => setWelcomeOpen(false)} />
      <FloatingAIEditor open={editorOpen} onOpenChange={setEditorOpen} />
      
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20">
                <Sparkles className="w-6 h-6 text-primary" />
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                AI Writer Pro
              </h1>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                onClick={() => setWelcomeOpen(true)}
                className="gap-2"
              >
                <Sparkles className="w-4 h-4" />
                Guide
              </Button>
              <Button
                onClick={() => setEditorOpen(true)}
                className="gap-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
              >
                <Edit3 className="w-4 h-4" />
                Start Writing
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="space-y-4">
              <Badge className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 text-blue-700 border-blue-200">
                ✨ Powered by Advanced AI
              </Badge>
              <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent leading-tight">
                Write Better with
                <br />
                <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                  AI Assistance
                </span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Transform your writing with AI-powered enhancements, real-time suggestions, 
                and beautiful customization options. Create professional content in seconds.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                size="lg"
                onClick={() => setEditorOpen(true)}
                className="gap-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-lg px-8 py-6 h-auto"
              >
                <Edit3 className="w-5 h-5" />
                Try AI Editor Now
                <ArrowRight className="w-5 h-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => setWelcomeOpen(true)}
                className="gap-2 text-lg px-8 py-6 h-auto"
              >
                <Sparkles className="w-5 h-5" />
                View Features
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-6 bg-muted/30">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20">
                  {stat.icon}
                </div>
                <div className="text-2xl font-bold text-primary">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Powerful AI Writing Features
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to create exceptional content with the help of artificial intelligence.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300 hover:scale-105 border-0 shadow-md">
                <CardHeader>
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4`}>
                    {feature.icon}
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-blue-500/5 to-purple-500/5">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold">
              Ready to Transform Your Writing?
            </h2>
            <p className="text-lg text-muted-foreground">
              Join thousands of writers who are already using AI to create better content faster.
            </p>
            <Button
              size="lg"
              onClick={() => setEditorOpen(true)}
              className="gap-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-lg px-8 py-6 h-auto"
            >
              <Sparkles className="w-5 h-5" />
              Start Writing with AI
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          size="lg"
          onClick={() => setEditorOpen(true)}
          className="rounded-full w-14 h-14 shadow-lg bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 hover:scale-110 transition-all duration-200"
        >
          <Edit3 className="w-6 h-6" />
        </Button>
      </div>
    </div>
  );
}
