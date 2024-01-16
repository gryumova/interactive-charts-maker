import { toast, ToastContainer } from 'react-toastify'
import { useEffect, useRef, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import Editor, { loader } from '@monaco-editor/react';

import "./App.css";
import "./toastify.css";
import ChartsLayout from "./components/ChartsLayout";
import { parsePanel } from "./utils/parseXML";
import { xml } from "./utils/config";
import { drawChart } from './utils/draw';
import { useTheme } from './hooks/useTheme';

const App = () => {
    const [content, setContent] = useState(xml);
    const [options, setOptions] = useState(parsePanel(xml));
    const [save, setSave] = useState(true);
    const {theme, setTheme} = useTheme();
    const editorRef = useRef(null);

    loader.init().then((monaco) => {
        monaco.editor.defineTheme('myLightTheme', {
            base: 'vs',
            inherit: true,
            rules: [],
            colors: {
                'editor.background': '#ffffff',
            },
        });
        monaco.editor.defineTheme('myDarkTheme', {
            base: 'vs-dark',
            inherit: true,
            rules: [],
            colors: {
                'editor.background': '#161b22',
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
            }
        });
    }, []);

    useEffect(() => {
        options.map((option) => {
            if (Object.keys(option).includes("Charts")) {
                try {
                    drawChart(option, theme);
                } catch (err) {
                    toast.error(err.message);
                }
            }
        });
    }, [theme])


    const handleSave = () => {
        setSave(true);
                                
        try {
            const options_ = parsePanel(editorRef.current.getValue());

            if (!options_) {
                setOptions([]);
                toast.warning("Panel not found")
                return 
            }

            setOptions([...options_]);
            toast.success("Xml saved!");
        } catch (err) {
            toast.error(err.message);
        }
    }

    const handleShow = () => {
        if (options.length === 0) return 

        setTimeout(() => {
            options.map((option) => {
                if (Object.keys(option).includes("Charts")) {
                    try {
                        drawChart(option, theme);
                    } catch (err) {
                        toast.error(err.message);
                    }
                }
            })
        }, 300);
    }

    const handleChange = (e) => {
        e.currentTarget.checked === true ? setTheme('dark'): setTheme('light');
    }

    return (
        <>
            <input 
                type="checkbox" 
                id="themeSwitch" 
                onChange={(e) => handleChange(e)}
                checked={theme==="dark"? "true": false}
            />
            <div className="tabs" id="page">
                <div className="tab">
                    <input 
                        type="radio" 
                        id="edit" 
                        name="tab-group" 
                        defaultChecked
                    />
                    <label 
                        htmlFor="edit" 
                        className="tab-title first-title"
                    >
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
                            theme={theme==='light'? 'myLightTheme': 'myDarkTheme'}
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
                    <input 
                        type="radio" 
                        id="preview"
                        name="tab-group"
                    />
                    <label 
                        htmlFor="preview" 
                        className="tab-title second-title"
                        id='second-title'
                        onClick={() => {handleShow();}}
                    >
                        Preview
                    </label> 
                    <section className="tab-content chart-content">
                        <ChartsLayout options={options} show/>
                    </section>
                </div>
                <label htmlFor="themeSwitch" className='switchLabel'></label>
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
