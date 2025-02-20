import CodeEditor from '@/components/editor/CodeEditor';
import Renderer from '@/components/editor/Renderer';

export default function EditorPage() {
  return (
    <div className={'flex h-screen min-h-fit w-full'}>
      <CodeEditor />
      <div className={'flex h-full w-full items-center justify-center gap-5'}>
        <Renderer />
      </div>
    </div>
  );
}
