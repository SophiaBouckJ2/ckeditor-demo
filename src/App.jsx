import { useState, useEffect, useRef } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";

import {
  DecoupledEditor,
  AccessibilityHelp,
  Autosave,
  CloudServices,
  Essentials,
  GeneralHtmlSupport,
  Heading,
  List,
  Paragraph,
  PasteFromOffice,
  SelectAll,
  Undo,
  Style,
} from "ckeditor5";
import {
  ExportPdf,
  ExportWord,
  ImportWord,
  MultiLevelList,
} from "ckeditor5-premium-features";

import "ckeditor5/ckeditor5.css";
import "ckeditor5-premium-features/ckeditor5-premium-features.css";

import "./App.css";

/**
 * Please update the following values with your actual tokens.
 * Instructions on how to obtain them: https://ckeditor.com/docs/trial/latest/guides/real-time/quick-start.html
 */
const LICENSE_KEY = import.meta.env.VITE_CKEDITOR_LICENSE_KEY;

export default function App() {
  const editorContainerRef = useRef(null);
  const editorMenuBarRef = useRef(null);
  const editorToolbarRef = useRef(null);
  const editorRef = useRef(null);
  const [isLayoutReady, setIsLayoutReady] = useState(false);

  useEffect(() => {
    setIsLayoutReady(true);

    return () => setIsLayoutReady(false);
  }, []);

  const editorConfig = {
    toolbar: {
      items: ["undo", "redo", "|", "heading", "|", "multiLevelList"],
      shouldNotGroupWhenFull: false,
    },
    plugins: [
      AccessibilityHelp,
      Autosave,
      CloudServices,
      Essentials,
      ExportPdf,
      ExportWord,
      GeneralHtmlSupport,
      Heading,
      ImportWord,
      List,
      MultiLevelList,
      Paragraph,
      PasteFromOffice,
      SelectAll,
      Undo,
      Style,
    ],
    exportPdf: {
      stylesheets: [
        /* This path should point to application stylesheets. */
        /* See: https://ckeditor.com/docs/ckeditor5/latest/features/converters/export-pdf.html */
        "./App.css",
        /* Export PDF needs access to stylesheets that style the content. */
        "https://cdn.ckeditor.com/ckeditor5/43.0.0/ckeditor5.css",
        "https://cdn.ckeditor.com/ckeditor5-premium-features/43.0.0/ckeditor5-premium-features.css",
      ],
      fileName: "export-pdf-demo.pdf",
      converterOptions: {
        format: "A4",
        margin_top: "20mm",
        margin_bottom: "20mm",
        margin_right: "12mm",
        margin_left: "12mm",
        page_orientation: "portrait",
      },
    },
    exportWord: {
      stylesheets: [
        /* This path should point to application stylesheets. */
        /* See: https://ckeditor.com/docs/ckeditor5/latest/features/converters/export-word.html */
        "./App.css",
        /* Export Word needs access to stylesheets that style the content. */
        "https://cdn.ckeditor.com/ckeditor5/43.0.0/ckeditor5.css",
        "https://cdn.ckeditor.com/ckeditor5-premium-features/43.0.0/ckeditor5-premium-features.css",
      ],
      fileName: "export-word-demo.docx",
      converterOptions: {
        document: {
          orientation: "portrait",
          size: "A4",
          margins: {
            top: "20mm",
            bottom: "20mm",
            right: "12mm",
            left: "12mm",
          },
        },
      },
    },
    heading: {
      options: [
        {
          model: "paragraph",
          title: "Paragraph",
          class: "ck-heading_paragraph",
        },
        {
          model: "title",
          view: {
            name: "h1",
            classes: "title",
          },
          title: "Title",
          class: "ck-heading_heading1_title",

          converterPriority: "high",
        },
        {
          model: "subtitle",
          view: {
            name: "h2",
            classes: "subtitle",
          },
          title: "Subtitle",
          class: "ck-heading_heading2_subtitle",

          converterPriority: "high",
        },
        {
          model: "endOfSection",
          view: {
            name: "h3",
            classes: "endOfSection",
          },
          title: "End Of Section",
          class: "ck-heading_heading3_endOfSection",

          converterPriority: "high",
        },
      ],
    },
    initialData: "", // TODO: inital data to be loaded, figure this out
    licenseKey: LICENSE_KEY,
    list: {
      properties: {
        styles: true,
        startIndex: true,
        reversed: true,
      },
    },
    menuBar: {
      isVisible: true,
      removeItems: ["edit", "format", "help"], // remove the default menu bar options to constrain the user
    },
    placeholder: "Type or paste your content here!",
  };

  return (
    <div>
      <div className="main-container">
        <div
          className="editor-container editor-container_document-editor editor-container_include-style"
          ref={editorContainerRef}
        >
          <div
            className="editor-container__menu-bar"
            ref={editorMenuBarRef}
          ></div>
          <div
            className="editor-container__toolbar"
            ref={editorToolbarRef}
          ></div>
          <div className="editor-container__editor-wrapper">
            <div className="editor-container__editor">
              <div ref={editorRef}>
                {isLayoutReady && (
                  <CKEditor
                    onReady={(editor) => {
                      editorToolbarRef.current.appendChild(
                        editor.ui.view.toolbar.element
                      );
                      editorMenuBarRef.current.appendChild(
                        editor.ui.view.menuBarView.element
                      );
                    }}
                    onAfterDestroy={() => {
                      Array.from(editorToolbarRef.current.children).forEach(
                        (child) => child.remove()
                      );
                      Array.from(editorMenuBarRef.current.children).forEach(
                        (child) => child.remove()
                      );
                    }}
                    editor={DecoupledEditor}
                    config={editorConfig}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
