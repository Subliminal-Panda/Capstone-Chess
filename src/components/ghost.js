import React, {useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Ghost(props) {
    const { file, rank, position, type, move, initposition, team, capture, castle, capturing, castling } = props

    return (
        <div
        onClick={ capture ? () => capturing(file, rank, position) : castle ? () => castling(file, rank, position) : () => move(file, rank, position)}
        initposition={initposition}
        key={`ghost${position}`}
        rank={rank}
        file={file}
        position={position}
        className={ capture ? `capture ghost ${team}ghost` : castle ? `castle ghost ${team}ghost` : `ghost ${team}ghost` }
        style={{
            gridArea: `${position}`,
        }}>
        <FontAwesomeIcon
        icon={ type }
        />
        </div>
    )
}
