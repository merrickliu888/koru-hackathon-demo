'use client';
import { useState } from 'react';

export default function GenerateButton() {
  const [generatedText, setGeneratedText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async () => {
    setIsLoading(true);
    try {
      const prompt = "Tell me an interesting fact about space";
      const response = await fetch('http://localhost:8000/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });
      
      const data = await response.json();
      setGeneratedText(data.message);
    } catch (error) {
      console.error('Error:', error);
      setGeneratedText('Error generating text');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <button
        onClick={handleGenerate}
        disabled={isLoading}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
      >
        {isLoading ? 'Generating...' : 'Generate Space Fact'}
      </button>
      
      {generatedText && (
        <div className="mt-4 p-4 border rounded max-w-lg">
          <p>{generatedText}</p>
        </div>
      )}
    </div>
  );
}