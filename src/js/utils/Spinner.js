import React from 'react'

export default class Spinner extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <span>
        <svg
          style={ Styles.spinner }
          viewBox="0 0 42 42">

          <g
            fill="none"
            transform="translate(3 3)"
            strokeWidth="3">

            <circle
              style={ Styles.circle }
              cx="18"
              cy="18"
              r="18" />

            <path
              style={ Styles.segment }
              d="M36 18c0-9.94-8.06-18-18-18"
              strokeLinecap="round"
              strokeLinejoin="round" />
          </g>
        </svg>
      </span>
    )
  }
}

const Styles = {
  spinner: {
    animation: 'spinner-animation 900ms linear infinite',
    display: 'inline-block',
    width: '40px',
    height: '40px'
  },

  circle: {
    stroke: '#979797',
    strokeOpacity: '0.25'
  },

  segment: {
    stroke: '#2E3A4B'
  }
}
