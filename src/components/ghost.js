import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChessPawn } from '@fortawesome/free-solid-svg-icons';

export default function Ghost(props) {
    const { file, rank, position } = props

    return (
        <FontAwesomeIcon
        key={position}
        rank={rank}
        file={file}
        position={position}
        className="ghost"
        style={{
            gridArea: `${position}`,
        }}
        icon={ faChessPawn }
        />
    )
}
