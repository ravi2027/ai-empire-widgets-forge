
import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { useToast } from '@/hooks/use-toast';
import { Sparkles, Wand2, CheckCircle, RotateCcw, Copy, Download, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface AITextEditorProps {
  initialValue?: string;
  placeholder?: string;
  minHeight?: string;
  maxHeight?: string;
  apiKey?: string;
  onTextChange?: (text: string) => void;
  className?: string;
  features?: {
    grammarCheck?: boolean;
    toneAdjustment?: boolean;
    autoComplete?: boolean;
    summarization?: boolean;
  };
}

interface Suggestion {
  id: string;
  type: 'grammar' | 'style' | 'tone' | 'completion';
  original: string;
  suggestion: string;
  position: { start: number; end: number };
  confidence: number;
}

interface EnhancementMode {
  id: string;
  label: string;
  description: string;
  prompt: string;
  icon: React.ReactNode;
}

const enhancementModes: EnhancementMode[] = [
  {
    id: 'professional',
    label: 'Professional',
    description: 'Make text more formal and business-appropriate',
    prompt: 'Rewrite this text to be more professional and formal while maintaining the core message:',
    icon: <Wand2 className="w-4 h-4" />
  },
  {
    id: 'casual',
    label: 'Casual',
    description: 'Make text more conversational and friendly',
    prompt: 'Rewrite this text to be more casual and conversational while maintaining the core message:',
    icon: <Sparkles className="w-4 h-4" />
  },
  {
    id: 'concise',
    label: 'Concise',
    description: 'Make text shorter and more direct',
    prompt: 'Rewrite this text to be more concise and direct while maintaining all key information:',
    icon: <CheckCircle className="w-4 h-4" />
  }
];

export function AITextEditor({
  initialValue = '',
  placeholder = 'Start typing... AI will help enhance your text.',
  minHeight = '200px',
  maxHeight = '400px',
  apiKey,
  onTextChange,
  className,
  features = {
    grammarCheck: true,
    toneAdjustment: true,
    autoComplete: true,
    summarization: true
  }
}: AITextEditorProps) {
  const [text, setText] = useState(initialValue);
  const [isProcessing, setIsProcessing] = useState(false);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [selectedMode, setSelectedMode] = useState<string>('professional');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { toast } = useToast();

  // Update word and character counts
  useEffect(() => {
    const words = text.trim().split(/\s+/).filter(word => word.length > 0).length;
    setWordCount(words);
    setCharCount(text.length);
  }, [text]);

  // Simulate AI processing with mock data for demo purposes
  const mockAIProcess = useCallback(async (inputText: string, mode: string): Promise<string> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mock enhancement based on mode
    switch (mode) {
      case 'professional':
        return inputText.replace(/\bawesome\b/gi, 'exceptional')
                       .replace(/\bgood\b/gi, 'effective')
                       .replace(/\bnice\b/gi, 'satisfactory');
      case 'casual':
        return inputText.replace(/\butilize\b/gi, 'use')
                       .replace(/\bfacilitate\b/gi, 'help')
                       .replace(/\bimplement\b/gi, 'do');
      case 'concise':
        return inputText.replace(/\bin order to\b/gi, 'to')
                       .replace(/\bdue to the fact that\b/gi, 'because')
                       .replace(/\bat this point in time\b/gi, 'now');
      default:
        return inputText;
    }
  }, []);

  const handleTextChange = useCallback((value: string) => {
    setText(value);
    onTextChange?.(value);
    
    // Auto-generate suggestions for demo
    if (value.length > 10 && features.grammarCheck) {
      const mockSuggestions: Suggestion[] = [
        {
          id: '1',
          type: 'grammar',
          original: 'your',
          suggestion: "you're",
          position: { start: 0, end: 4 },
          confidence: 0.95
        }
      ];
      setSuggestions(mockSuggestions);
      setShowSuggestions(true);
    }
  }, [onTextChange, features.grammarCheck]);

  const enhanceText = async (mode: string) => {
    if (!text.trim()) {
      toast({
        title: "No text to enhance",
        description: "Please enter some text first.",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);
    try {
      const enhanced = await mockAIProcess(text, mode);
      setText(enhanced);
      onTextChange?.(enhanced);
      
      toast({
        title: "Text enhanced!",
        description: `Applied ${enhancementModes.find(m => m.id === mode)?.label} tone`,
      });
    } catch (error) {
      toast({
        title: "Enhancement failed",
        description: "Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const applySuggestion = (suggestion: Suggestion) => {
    const newText = text.substring(0, suggestion.position.start) + 
                   suggestion.suggestion + 
                   text.substring(suggestion.position.end);
    setText(newText);
    onTextChange?.(newText);
    setSuggestions(prev => prev.filter(s => s.id !== suggestion.id));
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Copied to clipboard",
        description: "Text has been copied successfully.",
      });
    } catch (error) {
      toast({
        title: "Copy failed",
        description: "Please try again.",
        variant: "destructive"
      });
    }
  };

  const downloadText = () => {
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'enhanced-text.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const clearText = () => {
    setText('');
    onTextChange?.('');
    setSuggestions([]);
    setShowSuggestions(false);
  };

  return (
    <div className={cn("w-full max-w-4xl mx-auto bg-background border rounded-lg shadow-sm", className)}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-primary" />
          <h3 className="font-semibold">AI Text Editor</h3>
          <Badge variant="secondary" className="text-xs">
            Beta
          </Badge>
        </div>
        
        <div className="flex items-center gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" onClick={copyToClipboard}>
                <Copy className="w-4 h-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Copy text</TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" onClick={downloadText}>
                <Download className="w-4 h-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Download as text file</TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" onClick={clearText}>
                <RotateCcw className="w-4 h-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Clear text</TooltipContent>
          </Tooltip>
        </div>
      </div>

      {/* Enhancement Modes */}
      <div className="p-4 border-b bg-muted/30">
        <div className="flex items-center gap-2 mb-3">
          <Settings className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm font-medium text-muted-foreground">Enhancement Modes</span>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {enhancementModes.map((mode) => (
            <Tooltip key={mode.id}>
              <TooltipTrigger asChild>
                <Button
                  variant={selectedMode === mode.id ? "default" : "outline"}
                  size="sm"
                  className="gap-2"
                  onClick={() => {
                    setSelectedMode(mode.id);
                    enhanceText(mode.id);
                  }}
                  disabled={isProcessing}
                >
                  {mode.icon}
                  {mode.label}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{mode.description}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
      </div>

      {/* Main Editor */}
      <div className="relative">
        <Textarea
          ref={textareaRef}
          value={text}
          onChange={(e) => handleTextChange(e.target.value)}
          placeholder={placeholder}
          className={cn(
            "resize-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0",
            "rounded-none p-4"
          )}
          style={{ 
            minHeight, 
            maxHeight,
            fontSize: '16px',
            lineHeight: '1.6'
          }}
        />
        
        {isProcessing && (
          <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Sparkles className="w-4 h-4 animate-spin" />
              <span className="text-sm">Enhancing text...</span>
            </div>
          </div>
        )}
      </div>

      {/* Suggestions Panel */}
      {showSuggestions && suggestions.length > 0 && (
        <div className="border-t bg-muted/30 p-4">
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">AI Suggestions</span>
          </div>
          
          <div className="space-y-2">
            {suggestions.map((suggestion) => (
              <div
                key={suggestion.id}
                className="flex items-center justify-between p-2 bg-background rounded border"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      {suggestion.type}
                    </Badge>
                    <span className="text-sm">
                      <span className="line-through text-muted-foreground">{suggestion.original}</span>
                      {' → '}
                      <span className="text-primary">{suggestion.suggestion}</span>
                    </span>
                  </div>
                </div>
                
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => applySuggestion(suggestion)}
                  className="ml-2"
                >
                  Apply
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Footer Stats */}
      <div className="flex items-center justify-between p-4 border-t bg-muted/30 text-sm text-muted-foreground">
        <div className="flex items-center gap-4">
          <span>{wordCount} words</span>
          <Separator orientation="vertical" className="h-4" />
          <span>{charCount} characters</span>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-xs">Powered by AI</span>
          <Sparkles className="w-3 h-3" />
        </div>
      </div>
    </div>
  );
}

export default AITextEditor;
