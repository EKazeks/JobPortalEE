import React from 'react';
import { Editor } from '@tinymce/tinymce-react';

const TextEditor = ({ input: { value, onChange }, label, meta, ...props }) => {
  const handleChange = content => {
    onChange(content);
  };

  return (
    <>
      <Editor
        className={meta.touched && meta.error ? 'react-rte' : null}
        apiKey="99bv7tmt534nwq7entuy17qlr0ts7m5ipub5hexljx1zadq2"
        value={value}
        init={{
          branding: false,
          menubar: false,
          statusbar: false,
          placeholder: props.placeholder,
        }}
        onEditorChange={handleChange}
      />
      {meta.submitFailed && meta.invalid ? <p style={{ color: 'red', fontSize: '12px', marginLeft: '2 rem' }}>{meta.error}</p> : null}
    </>
  );
};

export default TextEditor;
