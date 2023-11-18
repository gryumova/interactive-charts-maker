import { useRef, useState} from 'react';
import Editor from '@monaco-editor/react';
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

import Charts from "./component/Charts"
import "./App.css"

import makeRequest from "./utils/connectBinance"
import drawChart from './utils/drawCharts';
import parsePanel from "./utils/parseXml"

export default function App() {
    const [content, setContent] = useState('<xml></xml>');
    const editorRef = useRef(null);

    const handleEditorDidMount = (editor, monaco) => {
        editorRef.current = editor;
    }

    const handleShow = () => {
        try {
            const panels = parsePanel(editorRef.current.getValue());
            panels.forEach(element => {
                makeRequest(element, drawChart);
            });
            toast.success("Charts created!");
        } catch(err) {
            toast.error(err.message)
        }


    }

    return (
        <div className='container'>
            <div className='controlBox'>
                <button className="showValue" onClick={handleShow}>Show</button>
            </div>
            <div className='editShowBox'>
                <Editor
                    height='100vh'
                    width='49%'
                    defaultLanguage='xml'
                    value={content}
                    onChange={(value) => setContent(value)}
                    onMount={handleEditorDidMount}
                />
                <Charts/>
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
        </div>
    )
}