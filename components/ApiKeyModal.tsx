import React, { useState } from 'react';
import { X, Key, ShieldCheck, ExternalLink, RefreshCw, Trash2 } from 'lucide-react';
import { ModelType } from '../types';

interface ApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (key: string) => void;
  currentKey: string;
  selectedModel: ModelType;
  onModelChange: (model: ModelType) => void;
}

export const ApiKeyModal: React.FC<ApiKeyModalProps> = ({ 
  isOpen, 
  onClose, 
  onSave, 
  currentKey,
  selectedModel,
  onModelChange
}) => {
  const [key, setKey] = useState(currentKey);
  const [showKey, setShowKey] = useState(false);

  if (!isOpen) return null;

  const handleSave = () => {
    onSave(key);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-[#1e1e1e] border border-gray-800 rounded-xl shadow-2xl w-full max-w-sm overflow-hidden animate-in zoom-in-95 duration-300">
        <div className="px-4 py-3 border-b border-gray-800 flex items-center justify-between bg-[#121212]">
          <div className="flex items-center gap-2 text-white">
            <div className="p-1.5 bg-purple-900/40 text-purple-400 rounded-md">
              <Key size={14} />
            </div>
            <h2 className="text-sm font-bold">API Configuration</h2>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 text-gray-500 hover:text-white hover:bg-gray-800 rounded-full transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        <div className="p-4 space-y-4">
          <div className="space-y-3">
            <div className="relative">
              <input
                type={showKey ? "text" : "password"}
                value={key}
                onChange={(e) => setKey(e.target.value)}
                placeholder="Enter your API Key..."
                className="w-full pl-3 pr-20 py-2 bg-[#121212] border border-gray-800 rounded-lg focus:ring-1 focus:ring-purple-500/50 focus:border-purple-500/50 outline-none transition-all font-mono text-xs text-white"
              />
              <div className="absolute right-1 top-1/2 -translate-y-1/2 flex items-center gap-1">
                {key && (
                  <button
                    type="button"
                    onClick={() => setKey('')}
                    className="text-gray-600 hover:text-red-400 p-1"
                    title="Remove API Key"
                  >
                    <Trash2 size={14} />
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setShowKey(!showKey)}
                  className="text-gray-600 hover:text-purple-400 p-1"
                >
                  {showKey ? <ShieldCheck size={14} /> : <Key size={14} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between px-1">
              <a 
                href="https://aistudio.google.com/app/apikey" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[9px] text-purple-400 hover:underline flex items-center gap-1"
              >
                Get API Key <ExternalLink size={8} />
              </a>
              <a 
                href="https://aistudio.google.com/app/plan_and_billing" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[9px] text-gray-500 hover:text-purple-400 hover:underline flex items-center gap-1"
              >
                Check Billing <ExternalLink size={8} />
              </a>
            </div>

            {selectedModel !== 'banana-free' && (
              <div className="p-2 bg-purple-900/10 rounded-lg border border-purple-800/20">
                <p className="text-[10px] text-purple-300/70 leading-relaxed mb-2">
                  Model <strong>{selectedModel}</strong> requires a Paid Key.
                </p>
                <button
                  onClick={() => {
                    onModelChange('banana-free');
                    onClose();
                  }}
                  className="w-full py-1.5 px-3 bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 text-[9px] font-bold rounded-lg transition-colors border border-purple-500/30"
                >
                  Switch to Banana Free
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="px-4 py-3 bg-[#121212] border-t border-gray-800 flex gap-2">
          <button
            onClick={onClose}
            className="flex-1 py-2 px-3 rounded-lg text-xs font-bold text-gray-500 hover:bg-gray-800 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex-2 py-2 px-4 rounded-lg text-xs font-bold text-white bg-purple-600 hover:bg-purple-700 shadow-lg shadow-purple-900/20 transition-all active:scale-95"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};
