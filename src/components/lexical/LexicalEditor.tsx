import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { ToolbarPlugin } from './LexicalToolbar';
import { HeadingNode } from '@lexical/rich-text';
import { TableNode, TableRowNode, TableCellNode } from '@lexical/table';
import { TextNode, ParagraphNode } from 'lexical';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { TablePlugin } from '@lexical/react/LexicalTablePlugin';
import { ListNode, ListItemNode } from '@lexical/list';
import { $generateHtmlFromNodes } from '@lexical/html';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { useContext } from 'react';
import { ThemeContext } from 'src/contexts/ThemeContext';

const theme = {
  text: {
    underline: 'editor-underline',
    strikethrough: 'editor-strikethrough',
  },
  table: 'editor-table',
  tableCell: 'editor-table-cell',
  tableCellHeader: 'editor-table-cell-header',
};

function onError(error: Error) {
  console.error(error);
}

const EditorTools = ({ field }) => {
  const { accentPrimary } = useContext(ThemeContext);
  const [editor] = useLexicalComposerContext();

  const onChange = () => {
    const html = editor.read(() => {
      return $generateHtmlFromNodes(editor);
    });

    const nodes = editor._editorState.toJSON();

    field.handleChange({ html, nodes });
  };

  return (
    <>
      <div className="w-full grow">
        <ToolbarPlugin />
        <div className="mt-2 h-full w-full">
          <RichTextPlugin
            contentEditable={
              <ContentEditable
                className="scrollbar-primary max-h-[850px] w-full overflow-y-auto border-2 border-opacity-50 p-2 outline-none"
                style={{ borderColor: accentPrimary }}
              />
            }
            ErrorBoundary={LexicalErrorBoundary}
          />
        </div>
      </div>
      <ListPlugin />
      <TablePlugin />
      <HistoryPlugin />
      <AutoFocusPlugin />
      <OnChangePlugin onChange={onChange} />
    </>
  );
};

const LexicalEditor = ({ field }) => {
  const initialConfig = {
    namespace: 'BookEditor',
    theme,
    onError,
    nodes: [
      TextNode,
      ParagraphNode,
      ListNode,
      ListItemNode,
      HeadingNode,
      TableNode,
      TableCellNode,
      TableRowNode,
    ],
    editorState: JSON.stringify(field.state.value.nodes),
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <EditorTools field={field} />
    </LexicalComposer>
  );
};

export default LexicalEditor;
