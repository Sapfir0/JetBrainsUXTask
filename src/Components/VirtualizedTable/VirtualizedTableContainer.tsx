import React from "react";
import { connect } from "react-redux";
import { AnyAction, bindActionCreators, Dispatch } from "redux";
import { RootReducer } from "Store/reducers";
import { container } from "../../inversify/inverisfyContainer";
import { SERVICE_IDENTIFIER } from "../../inversify/inversifyTypes";
import { RootStore } from "../../Store";
import { VirtualizedTable, VirtualizedTableProps } from "./VirtualizedTable";
import { VirtualizedTableAction } from "./VirtualizedTableAction";



function VirtualizedTableContainer(props: any) {
    return <VirtualizedTable {...props}/>
}


function mapDispatchToProps(dispatch: Dispatch<AnyAction>) {
    const actions = container.get<VirtualizedTableAction>(SERVICE_IDENTIFIER.VirtualizedTableAction)
    return {
        dispatch,
        actions: {
            ...bindActionCreators({
                filterNameChanged: actions.filterNameChanged,
                filterValueChanged: actions.filterValueChanged,
                sortDirectionChanged: actions.sortDirectionChanged,
                setHeaders: actions.setHeaders,
                getList: actions.getList
            }, dispatch)
        }
    }
}

const mapStateToProps = (state: RootReducer) => {
    
    return {
        data: state.subjectList.data,
        sortDir: state.subjectList.sortDir,
        sortBy: state.subjectList.sortBy,
        filterName: state.subjectList.filterName,
        filterValue: state.subjectList.filterValue,
        headers: state.subjectList.headers,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(VirtualizedTableContainer)
