import React from 'react';
import { VirtualizedTable } from './Components/VirtualizedTable/VirtualizedTable';
import { Columns } from './typings';


function App() {
    const columns: Columns = [
        {name: 'id'},
        {name: 'data1'},
        {name: 'data2'},
        {name: 'data3'},
        {name: 'data4'},
    ]

    return (
        <div className="App">
            <VirtualizedTable columns={columns} />
        </div>
    );
}

export default App;
