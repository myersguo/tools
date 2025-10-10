import React from 'react';
import { GitCompare } from 'lucide-react'; // Import a relevant icon
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

            {/* --- Placeholder for future tools --- */}
            {/* 
            <div className="bg-gray-800 rounded-lg shadow-lg p-6 transform hover:scale-105 transition-transform duration-300">
              <div className="flex items-center mb-4">
                <IconName className="w-8 h-8 mr-4 text-green-400" />
                <h2 className="text-2xl font-bold">Another Tool</h2>
              </div>
              <p className="text-gray-400 mb-6">
                Description for the next great tool you will build.
              </p>
              <a href="#" className="inline-block bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300">
                Coming Soon
              </a>
            </div>
            */}

          </div>
        </main>

      </div>
    </div>
  );
}

export default App;