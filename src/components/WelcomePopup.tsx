
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Wand2, FileText, Zap } from 'lucide-react';

interface WelcomePopupProps {
  open: boolean;
  onClose: () => void;
}

export function WelcomePopup({ open, onClose }: WelcomePopupProps) {
  const features = [
    {
      icon: <Wand2 className="w-5 h-5 text-blue-500" />,
      title: "AI-Powered Enhancement",
      description: "Transform your text with professional, casual, or concise tones"
    },
    {
      icon: <Sparkles className="w-5 h-5 text-purple-500" />,
      title: "Real-time Suggestions",
      description: "Get instant grammar, style, and tone improvements as you type"
    },
    {
      icon: <FileText className="w-5 h-5 text-green-500" />,
      title: "Export & Share",
      description: "Copy to clipboard or download your enhanced text easily"
    },
    {
      icon: <Zap className="w-5 h-5 text-yellow-500" />,
      title: "Color Customization",
      description: "Style your text with custom colors and formatting"
    }
  ];

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-6 h-6 text-primary" />
            <DialogTitle className="text-xl">Welcome to AI Text Editor</DialogTitle>
          </div>
          <DialogDescription className="text-base">
            Enhance your writing with AI-powered tools and beautiful customization options.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 my-4">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
              {feature.icon}
              <div>
                <h4 className="font-medium text-sm">{feature.title}</h4>
                <p className="text-xs text-muted-foreground">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex gap-1">
            <Badge variant="secondary">React</Badge>
            <Badge variant="secondary">AI-Powered</Badge>
          </div>
          <Button onClick={onClose} className="gap-2">
            <Sparkles className="w-4 h-4" />
            Get Started
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
