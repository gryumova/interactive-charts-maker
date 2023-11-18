import Charts from "./component/Charts"
import ControlBox from "./component/ControlBox";
import Editor from '@monaco-editor/react';
import "./App.css"

import { toast, ToastContainer } from 'react-toastify'
import { useRef, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';

import parsePanel from "./utils/parseXml";
import makeRequest from "./utils/connectBinance";
import drawChart from "./utils/drawCharts";

export default function App() {
    const [content, setContent] = useState('<xml></xml>');
    const [panels, setPanels] = useState([]);
    const editorRef = useRef(null);

    const handleEditorDidMount = (editor, monaco) => {
        editorRef.current = editor;
    }

    const handleShow = () => {
        if (panels.length===0){
            toast.warning("No charts.");
            return
        }
        try {
            panels.forEach(element => {
                makeRequest(element, drawChart);
            });
            toast.success("Charts created!");
        } catch(err) {
            toast.error(err.message)
        }
    }

    const handleSave = (value) => {
        try {
            setPanels(parsePanel(editorRef.current.getValue()));
            toast.success("XML saved!");
        } catch(err) {
            toast.error(err.message)
        }
    }

    return (
        <>
            <div className="tabs">
                <div className="tab">
                    <input type="radio" id="edit" name="tab-group" defaultChecked/>
                    <label htmlFor="edit" className="tab-title">Edit</label> 
                    <section className="tab-content">
                        <ControlBox handle={handleSave} text="Save"/>
                        <Editor
                            height='90vh'
                            defaultLanguage='xml'
                            value={content}
                            onChange={(value) => setContent(value)}
                            onMount={handleEditorDidMount}
                        />
                    </section>
                </div> 
                <div className="tab">
                    <input type="radio" id="preview" name="tab-group"/>
                    <label htmlFor="preview" className="tab-title">Preview</label> 
                    <section className="tab-content">
                        <Charts handleShow={handleShow}/>
                    </section>
                </div>
            </div>

            <ToastContainer 
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </>
    )
}