import CodeMirror from '@uiw/react-codemirror';
import { langs } from '@uiw/codemirror-extensions-langs';
import { color, colorView, colorTheme } from '@uiw/codemirror-extensions-color';

import './theme.css';

const TextEditor = ({ content, setContent }: { content: string; setContent: (value: string) => void }) => {
  return (
    <div className="relative flex h-full max-h-[calc(100vh-128px)] flex-col overflow-scroll pt-8">
      <CodeMirror value={content} onChange={(value) => setContent(value)} extensions={[langs.javascript()]} />
    </div>
  );
};

export default TextEditor;
