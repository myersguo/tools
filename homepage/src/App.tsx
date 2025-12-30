import React from 'react';
import { GitCompare, FileJson, Binary } from 'lucide-react'; // Import icons
import './App.css';

function App() {
  return (
    <div className="bg-gray-900 text-white min-h-screen p-8">
      <div className="container mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold">My Tools</h1>
          <p className="text-gray-400 mt-2">A collection of useful utilities</p>
        </header>

        <main>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* JSON Diff Viewer Card */}
            <div className="bg-gray-800 rounded-lg shadow-lg p-6 transform hover:scale-105 transition-transform duration-300">
              <div className="flex items-center mb-4">
                <GitCompare className="w-8 h-8 mr-4 text-blue-400" />
                <h2 className="text-2xl font-bold">JSON Diff Viewer</h2>
              </div>
              <p className="text-gray-400 mb-6">
                A simple and clean UI to compare two JSON objects and highlight the differences.
              </p>
              <a 
                href="json-diff-viewer/" 
                className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300"
              >
                Open Tool
              </a>
            </div>

            {/* JSON Formatter Card */}
            <div className="bg-gray-800 rounded-lg shadow-lg p-6 transform hover:scale-105 transition-transform duration-300">
              <div className="flex items-center mb-4">
                <FileJson className="w-8 h-8 mr-4 text-green-400" />
                <h2 className="text-2xl font-bold">JSON Formatter</h2>
              </div>
              <p className="text-gray-400 mb-6">
                Format, minify, escape, or unescape JSON data. View in a tree structure with syntax highlighting.
              </p>
              <a
                href="json-formatter/"
                className="inline-block bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300"
              >
                Open Tool
              </a>
            </div>

            {/* Encoder Decoder Card */}
            <div className="bg-gray-800 rounded-lg shadow-lg p-6 transform hover:scale-105 transition-transform duration-300">
              <div className="flex items-center mb-4">
                <Binary className="w-8 h-8 mr-4 text-purple-400" />
                <h2 className="text-2xl font-bold">Encoder / Decoder</h2>
              </div>
              <p className="text-gray-400 mb-6">
                Encode or decode text using Base64, URL, HTML, or Hex encoding schemes.
              </p>
              <a
                href="encoder-decoder/"
                className="inline-block bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300"
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
