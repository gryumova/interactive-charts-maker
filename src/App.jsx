import Charts from "./components/Charts"
import ControlBox from "./components/ControlBox";
import Editor from '@monaco-editor/react';
import "./App.css"

import { toast, ToastContainer } from 'react-toastify'
import { useRef, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { parsePanel } from "./utils/parseXML";
import { makeRequest } from "./http/binanceApi";
import drawChart from "./utils/drawChart";

const App = () => {
    const [content, setContent] = useState('<layout></layout>');
    const [options, setOptions] = useState([])
    const editorRef = useRef(null);

    const handleEditorDidMount = (editor, monaco) => {
        editorRef.current = editor;
    }

    const handleSubmit = () => {
        try {
            const opt = parsePanel(editorRef.current.getValue())

            if (!opt) {
                toast.warning("No charts");
                return
            }

            if (opt.length > 9){
                toast.warning("Too much charts. There are more than 9 of them!");
                return
            }

            setOptions(opt)
            toast.success("XML saved!")
        } catch(err) {
            toast.error(err.message)
        }
    }


    const handleShow = () => {
        options.forEach((option) => {
            makeRequest(option, drawChart)
        })

    }

    return (
        <>
            <div className="tabs">
                <div className="tab">
                    <input type="radio" id="edit" name="tab-group" defaultChecked/>
                    <label htmlFor="edit" className="tab-title first-title">Edit</label> 
                    <section className="tab-content">
                        <ControlBox handle={handleSubmit} text="Save"/>
                        <Editor
                            width='100%'
                            height='95vh'
                            defaultLanguage='xml'
                            options={{
                                fontSize:"14px"
                            }}
                            value={content}
                            onChange={(value) => setContent(value)}
                            onMount={handleEditorDidMount}
                        />
                    </section>
                </div> 
                <div className="tab">
                    <input type="radio" id="preview" name="tab-group"/>
                    <label htmlFor="preview" className="tab-title second-title">Preview</label> 
                    <section className="tab-content">
                        <Charts handle={handleShow}/>
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

export default App;
