requirejs([
    "/lib/codemirror/lib/codemirror.js"
], function () {
    requirejs([
        "/lib/codemirror/mode/clike/clike.js"
    ], function () {
        console.log("inside codemirror main");
        window.editor = CodeMirror.fromTextArea(codeTextarea, {
            lineNumbers: true,
            mode: "text/x-java"
        });
    });
});