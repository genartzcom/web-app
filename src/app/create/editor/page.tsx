import CodeEditor from '@/components/editor/CodeEditor';
import Renderer from '@/components/editor/Renderer';
import Button from '@/components/ui/Button';

export default function EditorPage() {
  return (
    <div className={'flex h-screen min-h-fit w-full'}>
      <CodeEditor />
      <div className={'flex h-full w-full flex-col items-center justify-center gap-5 p-6'}>
        <Renderer />
        <div className={'flex items-center gap-2'}>
          <Button variant={'secondary'} size={'md'}>
            Back to Edit
          </Button>
          <Button size={'md'}>Next Step</Button>
        </div>
      </div>
    </div>
  );
}
