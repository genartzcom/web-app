import CodeMirror from '@uiw/react-codemirror';
import './theme.css';

const TextEditor = ({ content, setContent }: { content: string; setContent: (value: string) => void }) => {
  return (
    <div className="relative flex h-full max-h-[calc(100vh-128px)] flex-col overflow-scroll">
      <CodeMirror value={content} onChange={(value) => setContent(value)} />
    </div>
  );
};

export default TextEditor;
