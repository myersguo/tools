import React from 'react';
import { GitCompare, FileJson, Binary } from 'lucide-react'; // Import icons
import './App.css';

function App() {
  return (
    <div className="bg-claude-bg-header text-claude-text-primary min-h-screen p-8">
      <div className="container mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold text-claude-text-primary">My Tools</h1>
          <p className="text-claude-text-secondary mt-2">A collection of useful utilities</p>
        </header>

        <main>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* JSON Diff Viewer Card */}
            <div className="bg-claude-bg-card border border-claude-border-light rounded-lg shadow-lg p-6 transform hover:scale-105 transition-transform duration-300">
              <div className="flex items-center mb-4">
                <GitCompare className="w-8 h-8 mr-4 text-claude-primary" />
                <h2 className="text-2xl font-bold text-claude-text-primary">JSON Diff Viewer</h2>
              </div>
              <p className="text-claude-text-secondary mb-6">
                A simple and clean UI to compare two JSON objects and highlight the differences.
              </p>
              <a
                href="json-diff-viewer/"
                className="inline-block bg-claude-button hover:opacity-90 text-white font-bold py-2 px-4 rounded-lg transition-opacity duration-300"
              >
                Open Tool
              </a>
            </div>

            {/* JSON Formatter Card */}
            <div className="bg-claude-bg-card border border-claude-border-light rounded-lg shadow-lg p-6 transform hover:scale-105 transition-transform duration-300">
              <div className="flex items-center mb-4">
                <FileJson className="w-8 h-8 mr-4 text-claude-status-success" />
                <h2 className="text-2xl font-bold text-claude-text-primary">JSON Formatter</h2>
              </div>
              <p className="text-claude-text-secondary mb-6">
                Format, minify, escape, or unescape JSON data. View in a tree structure with syntax highlighting.
              </p>
              <a
                href="json-formatter/"
                className="inline-block bg-claude-button hover:opacity-90 text-white font-bold py-2 px-4 rounded-lg transition-opacity duration-300"
              >
                Open Tool
              </a>
            </div>

            {/* Encoder Decoder Card */}
            <div className="bg-claude-bg-card border border-claude-border-light rounded-lg shadow-lg p-6 transform hover:scale-105 transition-transform duration-300">
              <div className="flex items-center mb-4">
                <Binary className="w-8 h-8 mr-4 text-claude-accent" />
                <h2 className="text-2xl font-bold text-claude-text-primary">Encoder / Decoder</h2>
              </div>
              <p className="text-claude-text-secondary mb-6">
                Encode or decode text using Base64, URL, HTML, or Hex encoding schemes.
              </p>
              <a
                href="encoder-decoder/"
                className="inline-block bg-claude-button hover:opacity-90 text-white font-bold py-2 px-4 rounded-lg transition-opacity duration-300"
              >
                Open Tool
              </a>
            </div>

          </div>
        </main>

      </div>
    </div>
  );
}

export default App;
