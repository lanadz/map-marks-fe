import React from 'react';
import './RemarkMarker.sass';

const RemarkerMarker = (props) => {
  return (
    <div className="remark-marker">
      <svg viewBox="0 0 267 267">
        <path d="M78.56,190.1l-53.816,64.513l208.076,-2.185l-41.997,-60.609l-25.446,-1.073l-9.928,17.901l-43.365,-0.74l-9.995,-17.446l-23.529,-0.361Z" style={{ fill: '#fdeecf' }} />
        <path d="M105.257,195.72l-4.885,-9.51l-23.857,-0.372l-59.904,73.421l234.35,1l-58.312,-74.244l-24.254,-0.122l-5.893,9.831l26.264,0.026l39.231,53.953l-188.198,0.077l40.704,-54.14l24.754,0.08Z" style={{ fill: '#cb6f01' }} />
        <path d="M77.387,237.717l114.057,0.302l-4.166,-10.782l-105.094,-0.025l-4.797,10.505Z" style={{ fill: '#cb6f01' }} />
        <path d="M86.086,215.477l100.47,0.272l-3.67,-9.756l-92.574,-0.023l-4.226,9.507Z" style={{ fill: '#cb6f01' }} />
        <path d="M134.084,221.957c0,0 74.634,-103.272 73.104,-151.054c-1.06,-33.126 -30.183,-68.142 -71.458,-69.138c-43.775,-1.056 -74.759,37.541 -75.683,72.453c-1.177,44.452 74.037,147.739 74.037,147.739Z" style={{ fill: 'url(#_Linear1)', stroke: '#216b8b', strokeWidth: '4.17px' }} />
        <circle cx="132.768" cy="77.726" r="51.294" style={{ fill: '#fdeecf', stroke: '#216b8b', strokeWidth: '4.17px' }} />
        <text x="130.836px" y="102.819px" textAnchor="middle" style={{ fontFamily: 'Arial', fontSize: '75px' }}>
          {props.text}
        </text>
        <defs>
          <linearGradient id="_Linear1" x1="0" y1="0" x2="1" y2="0" gradientUnits="userSpaceOnUse" gradientTransform="matrix(-1.40008,-177.557,177.557,-1.40008,138.581,192.334)">
            <stop offset="0" style={{ stopColor: '#00a9c8', stopOpacity: 1 }} />
            <stop offset="1" style={{ stopColor: '#3cffbf', stopOpacity: 1 }} />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

export default RemarkerMarker;