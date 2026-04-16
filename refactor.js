import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const srcDir = path.join(__dirname, 'src');

const walkSync = (dir, filelist = []) => {
  fs.readdirSync(dir).forEach(file => {
    const dirFile = path.join(dir, file);
    if (fs.statSync(dirFile).isDirectory()) {
      filelist = walkSync(dirFile, filelist);
    } else {
      if (dirFile.endsWith('.jsx')) {
        filelist.push(dirFile);
      }
    }
  });
  return filelist;
};

const map = {
  // Colors
  '"bg-brand-dark"': '"bg-white"',
  'bg-brand-dark ': 'bg-white ',
  'bg-brand-dark/95': 'bg-white',
  'bg-[#0D1117]': 'bg-slate-50',
  'bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#0d2e5a]/40 via-brand-dark to-brand-dark': 'bg-slate-50',
  'text-white': 'text-slate-900', // Warning: will hit button text too.
  'text-gray-400': 'text-slate-600',
  'text-gray-300': 'text-slate-600',
  'text-gray-500': 'text-slate-500',
  
  // Borders
  'border-white/5': 'border-slate-100',
  'border-white/10': 'border-slate-200',
  'border-white/20': 'border-slate-300',
  
  // Form/Input backgrounds
  'bg-white/5': 'bg-white shadow-sm border border-slate-200',
  'hover:text-white': 'hover:text-slate-900',
  
  // Custom button overrides where 'text-white' was replaced wrongly
  'hover:bg-white text-slate-900 px-6': 'hover:bg-brand-cyan hover:text-white text-slate-900 px-6'
};

const files = walkSync(srcDir);

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;

  // Manual careful replacements
  content = content.replace(/bg-brand-dark/g, 'bg-white');
  content = content.replace(/bg-\[\#0D1117\]/g, 'bg-slate-50');
  content = content.replace(/text-white/g, 'text-slate-900');
  content = content.replace(/text-gray-400/g, 'text-slate-600');
  content = content.replace(/text-gray-300/g, 'text-slate-600');
  content = content.replace(/text-gray-500/g, 'text-slate-500');
  content = content.replace(/border-white\/5/g, 'border-slate-100');
  content = content.replace(/border-white\/10/g, 'border-slate-200');
  content = content.replace(/bg-white\/5/g, 'bg-white shadow-sm border border-slate-200');
  
  // Correct buttons that just got broken
  // Example: text-brand-dark -> text-white
  content = content.replace(/text-brand-dark/g, 'text-white');
  
  if (content !== original) {
    fs.writeFileSync(file, content);
    console.log('Updated:', file);
  }
});

console.log('Theme swap refactor complete.');
