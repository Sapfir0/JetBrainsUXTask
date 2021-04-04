import VirtualizedTableContainer from 'Components/VirtualizedTable/VirtualizedTableContainer';
import React from 'react';
import { Column } from './typings';

const range = (count: number) => [...Array(count).keys()];

const tableData = range(50000).map((el, i) => ({
    id: i,
    data1: `data1 ${i}`,
    data2: `data2 ${i}`,
    data3: `data3 ${i}`,
    data4: `data4 ${i}`,
}));

function App() {
    const columns: Column[] = [
        { text: 'id' },
        { text: 'data1' },
        { text: 'data2' },
        { text: 'data3' },
        { text: 'data4' },
    ];

    return (
        <div className="App">
            <VirtualizedTableContainer columns={columns} />
        </div>
    );
}

export default App;
