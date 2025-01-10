import Icon from '@mdi/react';
import { ToolbarButton } from '../LexicalToolbar';
import { useState } from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { mdiTable } from '@mdi/js';
import InputFieldBasic from '../../InputFieldBasic';
import { INSERT_TABLE_COMMAND } from '@lexical/table';

const TableToolbarPlugin = (props: { iconSize: number }): JSX.Element => {
  const [cols, setCols] = useState(0);
  const [rows, setRows] = useState(0);
  const [modal, setModal] = useState(false);

  const [editor] = useLexicalComposerContext();
  return (
    <div className="relative">
      <ToolbarButton
        onClick={(e) => {
          e.preventDefault();
          setModal(!modal);
        }}
      >
        <Icon path={mdiTable} size={props.iconSize} />
      </ToolbarButton>

      {modal && (
        <div className="absolute right-1/2 top-full flex translate-x-1/2 translate-y-4 items-center gap-2">
          <InputFieldBasic
            className="w-20"
            type="number"
            label="Cols"
            onChange={(value: number) => {
              setCols(value);
            }}
          />
          <InputFieldBasic
            className="w-20"
            type="number"
            label="Rows"
            onChange={(value: number) => {
              setRows(value);
            }}
          />
          <button
            className="text-accent hover:underline"
            onClick={(e) => {
              e.preventDefault();
              console.log('table');
              editor.dispatchCommand(INSERT_TABLE_COMMAND, {
                columns: String(cols),
                rows: String(rows),
                includeHeaders: false,
              });
              setModal(false);
              setCols(0);
              setRows(0);
            }}
          >
            Create
          </button>
        </div>
      )}
    </div>
  );
};

export default TableToolbarPlugin;
