
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { AITextEditor } from './AITextEditor';
import { Sparkles, Maximize2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FloatingAIEditorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function FloatingAIEditor({ open, onOpenChange }: FloatingAIEditorProps) {
  const [text, setText] = useState('');

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl w-[95vw] h-[85vh] p-0 overflow-hidden">
        <DialogHeader className="p-6 pb-0">
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="flex items-center gap-2 text-xl">
                <div className="p-2 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20">
                  <Sparkles className="w-5 h-5 text-primary" />
                </div>
                AI Text Editor
              </DialogTitle>
              <DialogDescription className="text-sm text-muted-foreground mt-2">
                Enhance your writing with AI-powered tools, real-time suggestions, and beautiful customization options.
              </DialogDescription>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onOpenChange(false)}
              className="rounded-full"
            >
              <Maximize2 className="w-4 h-4" />
            </Button>
          </div>
        </DialogHeader>
        
        <div className="flex-1 overflow-hidden">
          <AITextEditor
            initialValue="Start writing your content here! Use the enhancement modes above to improve your text with AI assistance. 🚀"
            onTextChange={setText}
            className="border-0 shadow-none h-full"
            features={{
              grammarCheck: true,
              toneAdjustment: true,
              autoComplete: true,
              summarization: true,
              colorCustomization: true
            }}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
