import React, {useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Ghost(props) {
    const { file, rank, position, type, move, initposition, team, capture, capturing } = props

    return (
        <FontAwesomeIcon

        onClick={ capture ? () => capturing(file, rank, position) : () => move(file, rank, position)}
        initposition={initposition}
        key={`ghost${position}`}
        rank={rank}
        file={file}
        position={position}
        className={ capture ? `capture ghost ${team}ghost` : `ghost ${team}ghost` }
        style={{
            gridArea: `${position}`,
        }}
        icon={ type }
        />
    )
}
