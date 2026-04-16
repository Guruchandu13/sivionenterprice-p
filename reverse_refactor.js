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
  'bg-white shadow-sm border border-slate-200': 'bg-white/5',
  'bg-white ': 'bg-brand-dark ',
  'bg-white"': 'bg-brand-dark"',
  'bg-slate-50': 'bg-[#030A07]', // Extremely dark green/jade offset
  'text-slate-900': 'text-white',
  'text-slate-600': 'text-gray-400',
  'text-slate-500': 'text-gray-500',
  'border-slate-100': 'border-white/5',
  'border-slate-200': 'border-white/10',
};

const files = walkSync(srcDir);

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;

  // Manual careful replacements in reverse
  content = content.replace(/bg-white shadow-sm border border-slate-200/g, 'bg-white/5');
  content = content.replace(/bg-white /g, 'bg-brand-dark ');
  content = content.replace(/bg-white"/g, 'bg-brand-dark"');
  content = content.replace(/bg-slate-50/g, 'bg-[#040C09]');
  content = content.replace(/text-slate-900/g, 'text-white');
  content = content.replace(/text-slate-600/g, 'text-gray-400');
  content = content.replace(/text-slate-500/g, 'text-gray-500');
  content = content.replace(/border-slate-100/g, 'border-white/5');
  content = content.replace(/border-slate-200/g, 'border-white/10');
  
  if (content !== original) {
    fs.writeFileSync(file, content);
    console.log('Updated:', file);
  }
});

console.log('Theme swap reversed successfully.');
