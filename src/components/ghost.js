import React, {useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Ghost(props) {
    const { file, rank, position, type, move, initposition, team, capture, castle, promote, capturing, castling, promoting } = props

    const determineFunctions = () => {
        move(file, rank, position);
        if(capture) {
            capturing(file, rank, position)
        }
        if(promote) {
            promoting(file, rank, position)
        }
        if(castle) {
            castling(file, rank, position)
        }
    }

    const determineClassName = () => {
        const first = capture ? "capture" : null;
        const second = castle ? "castle" : null;
        const third = promote ? "promote" : null;
        const fourth = "ghost";
        const allClasses = `${first} ${second} ${third} ${fourth}`
        return(allClasses)
    }

    return (
        <div
        onClick={() => determineFunctions()}
        initposition={initposition}
        key={`ghost${position}`}
        rank={rank}
        file={file}
        position={position}
        className={determineClassName()}
        style={{
            gridArea: `${position}`,
        }}>
        <FontAwesomeIcon
        icon={ type }
        />
        </div>
    )
}
