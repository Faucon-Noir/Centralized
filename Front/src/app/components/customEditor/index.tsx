import { convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import { CustomEditorProps } from "./type";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import useData from "./hook";
import { EditorCy, TextareaSpecificationCy } from "@/app/const/specification/const";

/* La librairie utilisée est une des plus populaires pour les éditeurs WYSIWYG
 Elle est construite sur Draft.JS, et permet de rapidement déployer un éditeur customisé et customisable
 https://jpuri.github.io/react-draft-wysiwyg/#/docs
 https://draftjs.org/docs/getting-started

 Le composant CustomEditor permet d'obtenir du contenu HTML dans son état actuel. Si besoin est, il est possible de récupérer un contenu au format JSON
 Quand le contenu est modifié, la fonction onChange est appelée avec le contenu HTML.
  - content: le contenu HTML à afficher dans l'éditeur
  - onChange: la fonction appelée avec le contenu HTML à chaque modification

  L'index contient le rendu graphique, le hook toute la logique et le type les types utilisés.
  Attention certains types sont extérieurs au composant custom, notemment EditorState et ContentState qui sont des types de Draft.JS
  De même pour les classes css un peu plus bas. On les surcharges dans le style.css mais elles sont déjà définies dans la librairie, pour faire en sorte d'avoir un affichage de base
*/

const CustomEditor = ({ content, onChange }: CustomEditorProps) => {
  const { editorState, onEditorStateChange } = useData(content, onChange);
  return (
    <div>
      <Editor
        editorState={editorState}
        toolbarClassName="rdw-storybook-toolbar"
        wrapperClassName="rdw-storybook-wrapper"
        editorClassName="rdw-storybook-editor"
        placeholder="Rédigez votre contenu ici"
        onEditorStateChange={onEditorStateChange}
        toolbar={{
          options: [
            "inline",
            "blockType",
            "fontSize",
            "list",
            "textAlign",
            "colorPicker",
            "link",
            "history",
          ],
          blockType: {
            inDropdown: true,
            options: ["Normal", "H1", "H2", "H3", "Blockquote", "Code"],
          },
          fontSize: {
            options: [8, 9, 10, 11, 12, 14, 16, 18, 24, 30, 36],
            inDropdown: true,
          },
          fontFamily: {
            options: [
              "Arial",
              "Georgia",
              "Impact",
              "Tahoma",
              "Roboto",
              "Times New Roman",
              "Verdana",
            ],
          },
          colorPicker: {
            inDropdown: true,
            colors: [
              "rgb(97,189,109)",
              "rgb(26,188,156)",
              "rgb(84,172,210)",
              "rgb(44,130,201)",
              "rgb(147,101,184)",
              "rgb(71,85,119)",
              "rgb(204,204,204)",
              "rgb(65,168,95)",
              "rgb(0,168,133)",
              "rgb(61,142,185)",
              "rgb(41,105,176)",
              "rgb(85,57,130)",
              "rgb(40,50,78)",
              "rgb(0,0,0)",
              "rgb(247,218,100)",
              "rgb(251,160,38)",
              "rgb(235,107,86)",
              "rgb(226,80,65)",
              "rgb(163,143,132)",
              "rgb(239,239,239)",
              "rgb(255,255,255)",
              "rgb(250,197,28)",
              "rgb(243,121,52)",
              "rgb(209,72,65)",
              "rgb(184,49,47)",
              "rgb(124,112,107)",
              "rgb(209,213,216)",
            ],
          },
          link: {
            inDropdown: true,
          },
        }}
      />
      <textarea
        dara-cy={TextareaSpecificationCy}
        hidden // pour debug le retour editeur
        disabled
        value={
          editorState
            ? draftToHtml(convertToRaw(editorState.getCurrentContent()))
            : ""
        }
        style={{ width: "100%", height: "300px" }}
      />
    </div>
  );
};

export default CustomEditor;
