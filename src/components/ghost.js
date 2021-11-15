import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Ghost(props) {
    const { file, rank, position, type, move, initposition, team } = props

    return (
        <FontAwesomeIcon

        onClick={() => move(file, rank, position, initposition, type, team)}
        initposition={initposition}
        key={position}
        rank={rank}
        file={file}
        position={position}
        className="ghost"
        style={{
            gridArea: `${position}`,
        }}
        icon={ type }
        />
    )
}
