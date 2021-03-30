import {AnyAction, bindActionCreators, Dispatch} from "redux";
import {container} from "../../inversify/inverisfyContainer";
import {SERVICE_IDENTIFIER} from "../../inversify/inversifyTypes";
import {connect} from "react-redux";
import {RootStore} from "../../../Store";
import ProjectCard, {IProjectCard} from "./ProjectCard";
import { VirtualizedTableProps } from "./VirtualizedTableProps";
import React from "react";
import { VirtualizedTableAction } from "./VirtualizedTableAction";


function VirtualizedTableContainer(props: VirtualizedTableProps) {

    return <VirtualizedTable {...props}/>
}


function mapDispatchToProps(dispatch: Dispatch<AnyAction>) {
    const actions = container.get<VirtualizedTableAction>(SERVICE_IDENTIFIER.VirtualizedTableAction)
    return {
        dispatch,
        actions: {
            ...bindActionCreators({
                actions.SelectRow
            }, dispatch)
        }
    }
}

const mapStateToProps = (state: RootStore) => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(VirtualizedTableContainer)
