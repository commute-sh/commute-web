import React from 'react'
import { LoginPanel } from 'components/LoginPanel/LoginPanel'
import { shallow } from 'enzyme'

describe('(Component) LoginPanel', () => {
  let _wrapper

  beforeEach(() => {
    _wrapper = shallow(<LoginPanel />)
  })

  it('Renders a login panel', () => {
    const root = _wrapper.find('div')
    expect(root).to.exist
  })

})
