import { createContext, useState } from 'react';

export const FileDataContext = createContext();
FileDataContext.displayName = "File Data";

export const FileDataProvider = ({ children }) => {
    const [fileData, setFileData] = useState([]);
    const [header, setHeader] = useState([]);
    return (
        <FileDataContext.Provider value={ {
            fileData, 
            setFileData,
            header,
            setHeader
        }}>
            {children}
        </FileDataContext.Provider>
    )
}