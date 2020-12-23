import React, { Component } from 'react'

export default ({show}) => {
  return show ?
  (<div className={`d-flex justify-content-center mt-3 mb-3`}>
    <div className={'spinner-border text-success'} role="status">
      <span className="sr-only">Loading...</span>
    </div>
  </div>) :  null
};