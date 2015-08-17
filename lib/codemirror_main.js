require.config({
    packages: [{
        name: "codemirror",
        location: "/lib/CodeMirror-5.5.0/",
        main: "lib/codemirror"
    }]
});
require(["codemirror",
    "codemirror/addon/dialog/dialog",
    "codemirror/addon/search/searchcursor",
    "codemirror/mode/clike/clike",
    "codemirror/addon/edit/matchbrackets",
    "codemirror/keymap/vim",
], function(CodeMirror) {
    var editor = CodeMirror.fromTextArea(document.getElementById("code"), {
        lineNumbers: true,
        mode: "text/x-java",
        keyMap: "vim",
        matchBrackets: true,
        showCursorWhenSelecting: true
    });
    // var commandDisplay = document.getElementById('command-display');
    // var keys = '';
    // CodeMirror.on(editor, 'vim-keypress', function(key) {
    //     keys = keys + key;
    //     commandDisplay.innerHTML = keys;
    // });
    // CodeMirror.on(editor, 'vim-command-done', function(e) {
    //     keys = '';
    //     commandDisplay.innerHTML = keys;
    // });
    // CodeMirror.modeURL = "codemirror/mode/%N/%N";
    // document.getElementById("markdown").addEventListener("click", function() {
    //     CodeMirror.requireMode("markdown", function() {
    //         editor.replaceRange("This is **Markdown**.\n\n", {
    //             line: 0,
    //             ch: 0
    //         });
    //         editor.setOption("mode", "markdown");
    //     });
    // });
});