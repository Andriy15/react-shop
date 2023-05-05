import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-javascript'
import 'ace-builds/src-noconflict/theme-monokai'

export default function Playground() {

  const code = `import React from 'react'

function Playground() {
    return (
        <div>
            <h1>Playground</h1>
        </div>
    )
}
    `
  return (
    <AceEditor
      mode="javascript"
      theme="monokai"
      name="code-editor"
      editorProps={{ $blockScrolling: true }}
      value={code}
      width='100%'
      highlightActiveLine={true}
    />
  );
}

