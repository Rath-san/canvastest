import React from 'react';
import { ToolNumeric } from '../models/tools';
import { TOOLS } from '../models/enums';

interface ControlsProps {
    onToolChoose: (activeTool: ToolNumeric) => void;
}

interface IControls {

}

const Controls = (props: ControlsProps) => {

    const generateControls = ()/*: {name: string, value: ToolNumeric, onClick: () => void}[]*/ => {
        
        return [
            {
                name: 'eraser',
                value: 0,
                onClick: () => props.onToolChoose(0)
            },
            {
                name: 'brush',
                value: 1,
                onClick: () => props.onToolChoose(1)
            },
            {
                name: 'typo',
                value: 2,
                onClick: () => props.onToolChoose(2)
            },
        ]
        
    }

    generateControls()

    return (
        <div style={{ border: `1px solid red`, position: `fixed`, bottom: 0, width: `100%` }}>
            {generateControls().map((_: any) => (
                <button key={_.value} onClick={_.onClick}>{_.name}</button>
            ))}
        </div>
    );
};

Controls.defaultProps = {};

export default Controls;
