requirejs([
    "../../lib/codemirror/lib/codemirror.js"
], function () {
    requirejs([
        "../../lib/codemirror/mode/clike/clike.js"
    ], function () {
        window.editor = CodeMirror.fromTextArea(codeTextarea, {
            lineNumbers: true,
            mode: "text/x-java"
        });
    });
});

// <script src="../../lib/codemirror/lib/codemirror.js"></script>
// <link rel="stylesheet" href="../../lib/codemirror/lib/codemirror.css">
// <script src="../../lib/codemirror/mode/clike/clike.js"></script>

// <script>
//     var editor = CodeMirror.fromTextArea(codeTextarea, {
//     lineNumbers: true,
//     mode:  "text/x-java"
//     });
// </script>