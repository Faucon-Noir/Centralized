import { EditorState } from 'draft-js';

export type UseDataProps = {
	editorState: EditorState | undefined;
	onEditorStateChange: (editorState: EditorState) => void;
};

export type CustomEditorProps = {
	content: string;
	onChange: (text: string) => void;
};
