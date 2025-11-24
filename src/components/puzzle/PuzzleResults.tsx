import { Card } from '@/components/ui/card';
import { TrendingUp, BarChart3, Zap } from 'lucide-react';
import { SequenceData } from '@/pages/PatternPuzzle';

interface PuzzleResultsProps {
  data: SequenceData;
}

const colorEmoji: { [key: string]: string } = { R: '🔴', G: '🟢', V: '🟣' };
const colorName: { [key: string]: string } = { R: 'Red', G: 'Green', V: 'Violet' };
const colorClass: { [key: string]: string } = {
  R: 'bg-red-500',
  G: 'bg-green-500',
  V: 'bg-purple-500',
};

export const PuzzleResults = ({ data }: PuzzleResultsProps) => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Sequence Visualization */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Zap className="h-5 w-5" />
          Your Puzzle Sequence
        </h3>
        <div className="flex items-center gap-2 overflow-x-auto pb-2 flex-wrap">
          {data.sequence.map((color, i) => (
            <div key={i} className="flex flex-col items-center">
              <span className="text-3xl">{colorEmoji[color]}</span>
              <span className="text-xs text-muted-foreground">#{i + 1}</span>
            </div>
          ))}
          <span className="text-2xl mx-2">→</span>
          <div className="flex flex-col items-center">
            <span className="text-4xl animate-pulse">{colorEmoji[data.analysis.prediction.topChoice.color]}</span>
            <span className="text-xs font-semibold text-primary">Predicted!</span>
          </div>
        </div>
      </Card>

      {/* Prediction Card */}
      <Card className="p-6 border-primary/50 bg-gradient-to-br from-primary/5 to-transparent">
        <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <TrendingUp className="h-6 w-6 text-primary" />
          Puzzle Solution
        </h3>
        <div className="mb-6">
          <div className="flex items-center gap-4 mb-2">
            <span className="text-6xl">{colorEmoji[data.analysis.prediction.topChoice.color]}</span>
            <div>
              <h4 className="text-3xl font-bold">{colorName[data.analysis.prediction.topChoice.color]}</h4>
              <p className="text-xl text-muted-foreground">
                {data.analysis.prediction.topChoice.confidence}% Logic Score
              </p>
            </div>
          </div>
          <p className="text-muted-foreground leading-relaxed mt-4">
            <strong>Reasoning:</strong> {data.analysis.prediction.reasoning}
          </p>
        </div>

        <div className="space-y-2">
          <h5 className="font-semibold text-sm">Alternative Solutions:</h5>
          {data.analysis.prediction.alternatives.map((alt, i) => (
            <div key={i} className="flex items-center justify-between p-3 bg-card rounded-lg border">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{colorEmoji[alt.color]}</span>
                <span className="font-medium">{colorName[alt.color]}</span>
              </div>
              <span className="text-sm text-muted-foreground">{alt.confidence}%</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Statistics */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <BarChart3 className="h-5 w-5" />
          Pattern Statistics
        </h3>
        
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold mb-3">Color Frequency</h4>
            <div className="space-y-2">
              {Object.entries(data.analysis.frequencies).map(([color, freq]) => (
                <div key={color} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="flex items-center gap-2">
                      <span className="text-xl">{colorEmoji[color]}</span>
                      {colorName[color]}
                    </span>
                    <span className="font-semibold">{freq}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className={`${colorClass[color]} h-2 rounded-full transition-all duration-500`}
                      style={{ width: `${freq}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Detected Streaks</h4>
            <div className="flex gap-2 flex-wrap">
              {data.analysis.streaks.filter(s => s.length > 1).map((streak, i) => (
                <div key={i} className="px-3 py-2 bg-card border rounded-lg">
                  <span className="text-lg">{colorEmoji[streak.color]}</span>
                  <span className="ml-2 text-sm">×{streak.length}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* Tips */}
      <Card className="p-6 bg-gradient-to-r from-primary/10 to-transparent">
        <h3 className="text-lg font-semibold mb-3">🎯 Practice Tips</h3>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>• Look for repeating patterns early (cycles like R-G-V)</li>
          <li>• Track color frequencies - overdue colors often appear next</li>
          <li>• Streaks of 2+ usually break to balance the sequence</li>
          <li>• Test with 10+ tiles for more reliable pattern detection</li>
          <li>• Remember: Real randomness has no memory - this is just logic practice!</li>
        </ul>
      </Card>
    </div>
  );
};
