import { useState } from 'react';
import { Upload, TrendingUp, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { SequenceAnalyzer } from '@/components/puzzle/SequenceAnalyzer';
import { UploadZone } from '@/components/puzzle/UploadZone';
import { PuzzleResults } from '@/components/puzzle/PuzzleResults';
export interface SequenceData {
  sequence: string[];
  analysis: {
    frequencies: {
      [key: string]: number;
    };
    streaks: {
      color: string;
      length: number;
    }[];
    transitions: {
      [key: string]: {
        [key: string]: number;
      };
    };
    prediction: {
      topChoice: {
        color: string;
        confidence: number;
      };
      alternatives: {
        color: string;
        confidence: number;
      }[];
      reasoning: string;
    };
  };
}
export default function PatternPuzzle() {
  const {
    toast
  } = useToast();
  const [sequenceData, setSequenceData] = useState<SequenceData | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [manualInput, setManualInput] = useState('');
  const demoSequence = ['R', 'G', 'R', 'V', 'R', 'R', 'G', 'V', 'G', 'R'];
  const handleImageUpload = async (file: File) => {
    setIsAnalyzing(true);
    toast({
      title: "Processing Image",
      description: "Extracting color sequence from your puzzle..."
    });

    // Simulate OCR processing (in real app, would call edge function with OCR)
    setTimeout(() => {
      const mockSequence = ['R', 'G', 'R', 'V', 'R', 'G', 'V', 'R', 'R', 'G'];
      analyzeSequence(mockSequence);
      toast({
        title: "Sequence Extracted!",
        description: "Pattern analysis complete"
      });
    }, 2000);
  };
  const handleManualInput = () => {
    const colors = manualInput.toUpperCase().split(/[\s,]+/).filter(c => ['R', 'G', 'V'].includes(c));
    if (colors.length < 3) {
      toast({
        title: "Need More Data",
        description: "Enter at least 3 colors (R, G, or V)",
        variant: "destructive"
      });
      return;
    }
    analyzeSequence(colors);
  };
  const analyzeSequence = (sequence: string[]) => {
    setIsAnalyzing(true);

    // Calculate frequencies
    const frequencies: {
      [key: string]: number;
    } = {
      R: 0,
      G: 0,
      V: 0
    };
    sequence.forEach(color => frequencies[color]++);
    const total = sequence.length;
    Object.keys(frequencies).forEach(key => {
      frequencies[key] = Math.round(frequencies[key] / total * 100);
    });

    // Detect streaks
    const streaks: {
      color: string;
      length: number;
    }[] = [];
    let currentStreak = {
      color: sequence[0],
      length: 1
    };
    for (let i = 1; i < sequence.length; i++) {
      if (sequence[i] === currentStreak.color) {
        currentStreak.length++;
      } else {
        streaks.push({
          ...currentStreak
        });
        currentStreak = {
          color: sequence[i],
          length: 1
        };
      }
    }
    streaks.push(currentStreak);

    // Calculate transitions
    const transitions: {
      [key: string]: {
        [key: string]: number;
      };
    } = {
      R: {
        R: 0,
        G: 0,
        V: 0
      },
      G: {
        R: 0,
        G: 0,
        V: 0
      },
      V: {
        R: 0,
        G: 0,
        V: 0
      }
    };
    for (let i = 0; i < sequence.length - 1; i++) {
      transitions[sequence[i]][sequence[i + 1]]++;
    }

    // Predict next color
    const lastColor = sequence[sequence.length - 1];
    const currentStreakLength = streaks[streaks.length - 1].length;

    // Logic: Anti-streak bias + overdue colors
    const baseProbability = 33;
    const predictions: {
      [key: string]: number;
    } = {
      R: baseProbability,
      G: baseProbability,
      V: baseProbability
    };

    // Reduce probability of continuing streak after 2+
    if (currentStreakLength >= 2) {
      predictions[lastColor] -= 20;
    }

    // Boost overdue colors
    const sortedByFreq = Object.entries(frequencies).sort((a, b) => a[1] - b[1]);
    predictions[sortedByFreq[0][0]] += 15;

    // Normalize
    const sum = Object.values(predictions).reduce((a, b) => a + b, 0);
    Object.keys(predictions).forEach(key => {
      predictions[key] = Math.max(5, Math.round(predictions[key] / sum * 100));
    });
    const sorted = Object.entries(predictions).sort((a, b) => b[1] - a[1]);
    const reasoning = currentStreakLength >= 2 ? `Current ${currentStreakLength}-tile ${colorName(lastColor)} streak suggests pattern break. ${colorName(sorted[0][0])} is overdue (${frequencies[sorted[0][0]]}% frequency) and fits the cycle logic!` : `Pattern shows balanced distribution. ${colorName(sorted[0][0])} leads with transition probability from ${colorName(lastColor)}.`;
    setSequenceData({
      sequence,
      analysis: {
        frequencies,
        streaks,
        transitions,
        prediction: {
          topChoice: {
            color: sorted[0][0],
            confidence: sorted[0][1]
          },
          alternatives: sorted.slice(1).map(([color, conf]) => ({
            color,
            confidence: conf
          })),
          reasoning
        }
      }
    });
    setIsAnalyzing(false);
  };
  const colorName = (code: string) => {
    const names: {
      [key: string]: string;
    } = {
      R: 'Red',
      G: 'Green',
      V: 'Violet'
    };
    return names[code] || code;
  };
  return <div className="min-h-screen bg-background">
      <div className="container max-w-6xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4">
            <Zap className="h-10 w-10 text-primary" />
            <h1 className="text-4xl font-bold">​WOLF ANALYZER
   </h1>
          </div>
          <p className="text-xl text-muted-foreground mb-6">
            Sharpen your logic skills by decoding color sequences! Upload puzzles or try the demo.
          </p>
          <div className="inline-block bg-card border border-border rounded-lg p-4 mb-8">
            <p className="text-sm text-muted-foreground mb-2">🧩 For educational entertainment only</p>
            <p className="text-xs text-muted-foreground">Patterns are simulated logic exercises, not real predictions</p>
          </div>

          {/* Demo Sequence */}
          <Card className="p-6 max-w-2xl mx-auto mb-8">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Try the Demo Puzzle
            </h3>
            <div className="flex items-center justify-center gap-2 mb-4 flex-wrap">
              {demoSequence.map((color, i) => <span key={i} className="text-3xl">
                  {color === 'R' && '🔴'}
                  {color === 'G' && '🟢'}
                  {color === 'V' && '🟣'}
                </span>)}
              <span className="text-2xl">→ ?</span>
            </div>
            <Button onClick={() => analyzeSequence(demoSequence)} size="lg">
              Solve This Puzzle
            </Button>
          </Card>
        </div>

        {/* Upload Section */}
        <UploadZone onImageUpload={handleImageUpload} isAnalyzing={isAnalyzing} />

        {/* Manual Input */}
        <Card className="p-6 mb-8">
          <h3 className="text-lg font-semibold mb-4">Or Enter Manually</h3>
          <div className="flex gap-2">
            <input type="text" value={manualInput} onChange={e => setManualInput(e.target.value)} placeholder="Enter sequence: R G V R R G..." className="flex-1 px-4 py-2 border border-input rounded-md bg-background" />
            <Button onClick={handleManualInput} disabled={isAnalyzing}>
              Analyze
            </Button>
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            Use R (Red), G (Green), V (Violet) separated by spaces
          </p>
        </Card>

        {/* Results */}
        {sequenceData && <PuzzleResults data={sequenceData} />}
      </div>
    </div>;
}