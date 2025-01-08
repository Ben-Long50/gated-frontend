import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import RichTextToolbar, { formats, modules } from './RichTextToolbar';

const RichTextEditor = (props) => {
  return (
    <>
      <RichTextToolbar />
      <ReactQuill
        theme="snow"
        modules={modules}
        formats={formats}
        value={props.field.state.value}
        onChange={(text) => {
          props.field.handleChange(text);
        }}
      />
    </>
  );
};

export default RichTextEditor;
