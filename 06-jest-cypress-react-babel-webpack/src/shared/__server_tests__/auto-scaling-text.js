import * as React from 'react'
import ReactDOMServer from 'react-dom/server'
import AutoScalingText from 'shared/auto-scaling-text'

test('renders', () => {
  ReactDOMServer.renderToString(<AutoScalingText />)
})
