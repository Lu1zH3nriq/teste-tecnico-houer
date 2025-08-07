import { createContext, useContext, useState } from "react";


const ListContext = createContext();

export function ListProvider({ children }) {
    const [ refreshKey, setRefreshKey ] = useState(0);

    const refreshList = () => setRefreshKey( prev => prev +1 )

    return (

        < ListContext.Provider value={{ refreshKey, refreshList }}>
            {children}
        </ListContext.Provider>
    );
}

export function useListContext(){
    return useContext(ListContext);
}