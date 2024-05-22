import { UseDataProps } from "./type";
import { ContentState, EditorState, convertToRaw } from "draft-js";
import { useCallback, useEffect, useState } from "react";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";

const useData = (
  content: string,
  onChange: (text: string) => void
): UseDataProps => {
  // On laisse le type EditorState au useState, sinon ça peut nous causer de gros problèmes
  const [editorState, setEditorState] = useState<EditorState>();

  useEffect(() => {
    if (content) {
      const blocksFromHtml = htmlToDraft(content);
      const { contentBlocks, entityMap } = blocksFromHtml;
      const contentState = ContentState.createFromBlockArray(
        contentBlocks,
        entityMap
      );
      setEditorState(EditorState.createWithContent(contentState));
    } else {
      setEditorState(EditorState.createEmpty());
    }
  }, [content]);

  const onEditorStateChange = useCallback(
    (editorState: EditorState) => {
      setEditorState(editorState);
      const htmlContent = draftToHtml(
        convertToRaw(editorState.getCurrentContent())
      );
      onChange(htmlContent);
    },
    [onChange]
  );

  return {
    editorState,
    onEditorStateChange,
  };
};

export default useData;
