import { toast, ToastContainer } from 'react-toastify'
import { useEffect, useRef, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import Editor, { loader } from '@monaco-editor/react';

import "./App.css";
import "./toastify.css";
import Charts from "./components/Charts";
import { parsePanel } from "./utils/parseXML";
import { getLayoutWithBorder, getLayout } from "./utils/utils";
import { makeRequest } from "./http/binanceApi";
import { drawChart } from "./utils/draw";
import { xml } from "./utils/config";

const App = () => {
    const [content, setContent] = useState(xml);
    const [options, setOptions] = useState([]);
    const [layout, setLayout] = useState([]);
    const [save, setSave] = useState(true);
    const editorRef = useRef(null);

    loader.init().then((monaco) => {
        monaco.editor.defineTheme('myTheme', {
            base: 'vs',
            inherit: true,
            rules: [],
            colors: {
                'editor.background': '#ffffff',
            },
        });
    });

    const handleEditorDidMount = (editor, monaco) => {
        editorRef.current = editor;
    }

    useEffect(() => {
        document.addEventListener('keydown', function(event) {
            if (event.code ==='KeyS' && (event.ctrlKey || event.metaKey)) {
                event.preventDefault();
                handleSave();
                console.log('cntrl')
            }
        });
    }, [])

    const handleSave = () => {
        setSave(true);
                                
        try {
            const options_ = parsePanel(editorRef.current.getValue());
            const layout_ = getLayout(options_);

            if (!options_) {
                setOptions([]);
                toast.warning("Panel not found")
                return 
            }

            setOptions([...options_]);
            setLayout([...layout_]);
            toast.success("Xml saved!");
        } catch (err) {
            toast.error(err.message);
        }
    }

    const handleShow = () => {
        if (options.length === 0) {
            return;
        }

        options.forEach((option) => {
            makeRequest(option, drawChart);
        })
    }
    
    return (
        <>
            <div className="tabs">
                <div className="tab">
                    <input type="radio" id="edit" name="tab-group" defaultChecked/>
                    <label htmlFor="edit" className="tab-title first-title">
                        Editor
                        <div 
                            style={{
                                display: save ?"none": "block",
                            }} 
                            className='saved'
                            >
                        </div>
                    </label> 
                    <section className="tab-content editor">
                        <Editor
                            theme='myTheme'
                            width='100%'
                            height='95vh'
                            defaultLanguage='xml'
                            options={{
                                fontSize:"14px"
                            }}
                            value={content}
                            onChange={(value) => {
                                setSave(false);
                                setContent(value);
                            }}
                            onMount={handleEditorDidMount}
                        />
                    </section>
                </div> 
                <div className="tab">
                    <input type="radio" id="preview" name="tab-group"/>
                    <label 
                        htmlFor="preview" 
                        className="tab-title second-title"
                        onClick={handleShow}
                    >
                        Preview
                    </label> 
                    <section className="tab-content chart-content">
                        <Charts layout={layout}/>
                    </section>
                </div>
            </div>

            <ToastContainer 
                position="top-right"
                autoClose={2000}
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
