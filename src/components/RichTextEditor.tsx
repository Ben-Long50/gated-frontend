import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import RichTextToolbar, { formats, modules } from './RichTextToolbar';

const RichTextEditor = (props) => {
  return (
    <div className={props.className}>
      <RichTextToolbar className="z-10" />
      <ReactQuill
        theme="snow"
        modules={modules}
        formats={formats}
        value={props.field.state.value}
        onChange={(text) => {
          props.field.handleChange(text);
        }}
      />
    </div>
  );
};

export default RichTextEditor;
