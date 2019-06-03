import React from 'react'
import PropTypes from 'prop-types'
import { BitTemplate } from '../../templates/bit'

const BitPreview = ({ entry, widgetFor }) => (
  <BitTemplate
    content={widgetFor('body')}
    description={entry.getIn(['data', 'description'])}
    tags={entry.getIn(['data', 'tags'])}
    title={entry.getIn(['data', 'title'])}
  />
)

BitPreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  widgetFor: PropTypes.func,
}

export default BitPreview
