import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Ghost(props) {
    const { file, rank, position, type, move, initposition, team, pieces } = props

    return (
        <FontAwesomeIcon

        onClick={() => move(file, rank, position)}
        initposition={initposition}
        key={`ghost${position}`}
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
