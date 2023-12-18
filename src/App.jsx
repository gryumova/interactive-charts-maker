import { toast, ToastContainer } from 'react-toastify'
import { useEffect, useRef, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import Editor, { loader } from '@monaco-editor/react';

import "./App.css"
import Charts from './components/Charts';
import { parsePanel } from './utils/parseXML.js';
import { clearAll, getLayoutWithBorder } from './utils/utils.js';
import { makeRequest } from './http/binanceApi.js';
import { drawChart } from './utils/draw.js';
import ControlBox from './components/ControlBox';

const App = () => {
    const [content, setContent] = useState('<layout></layout>');
    const [options, setOptions] = useState([]);
    const [layout, setLayout] = useState([]);
    const editorRef = useRef(null);
    const [save, setSave] = useState(true);

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

    // const layout = useMemo(() => {
    //     if (!options) return [];

    //     return getLayoutWithBorder(options);
    // }, [options])

    useEffect(() => {
        document.addEventListener('keydown', function(event) {
            if (event.code ==='KeyS' && (event.ctrlKey || event.metaKey)) {
                event.preventDefault();
                setSave(true);
                parseXMLLayouts();
            }
          });
    }, [])

    const handleEditorDidMount = (editor, monaco) => {
        editorRef.current = editor;
    }

    const parseXMLLayouts = () => {
        try {
            const opt = parsePanel(editorRef.current.getValue());

            if (!opt) {
                setOptions([]);
                return 
            }

            setOptions(opt);
            toast.success("XML saved!")
        } catch(err) {
            toast.error(err.message);
            return null;
        }
    }

    const handleShow = () => {
        clearAll(layout); 

        if (options.length === 0) {
            toast.warning("No charts to draw!");
            return;
        }

        setLayout(getLayoutWithBorder(options));

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
                        Edit
                        <div 
                            style={{
                                display: save ?"none": "block",
                            }} 
                            className='saved'
                            >
                        </div>
                    </label> 
                    <section className="tab-content">
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
                    <label htmlFor="preview" className="tab-title second-title">Preview</label> 
                    <section className="tab-content chart-content">
                        <ControlBox handle={handleShow} text="Show"></ControlBox>
                        <Charts layout={layout} handle={handleShow}/>
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
