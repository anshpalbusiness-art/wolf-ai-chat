import { useCallback } from 'react';
import { Upload } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';

interface UploadZoneProps {
  onImageUpload: (file: File) => void;
  isAnalyzing: boolean;
}

export const UploadZone = ({ onImageUpload, isAnalyzing }: UploadZoneProps) => {
  const { toast } = useToast();

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      const file = e.dataTransfer.files[0];
      if (file && file.type.startsWith('image/')) {
        onImageUpload(file);
      } else {
        toast({
          title: "Invalid File",
          description: "Please upload an image file (PNG, JPG)",
          variant: "destructive",
        });
      }
    },
    [onImageUpload, toast]
  );

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onImageUpload(file);
    }
  };

  return (
    <Card
      className="p-8 mb-8 border-dashed border-2 hover:border-primary transition-colors cursor-pointer"
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      onClick={() => document.getElementById('file-input')?.click()}
    >
      <div className="text-center">
        <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
        <h3 className="text-lg font-semibold mb-2">Upload Your Puzzle Screenshot</h3>
        <p className="text-muted-foreground mb-4">
          Drag & drop or click to browse
        </p>
        <p className="text-sm text-muted-foreground">
          Supports PNG, JPG • Best with clear color grids
        </p>
        <input
          id="file-input"
          type="file"
          accept="image/*"
          onChange={handleFileInput}
          className="hidden"
          disabled={isAnalyzing}
        />
      </div>
    </Card>
  );
};
