import { RouterLink } from './index';
import { expect } from 'chai';
import Router from '../../utils/Router';
import sinon from 'sinon';

describe('Link', () => {
  it('should render', () => {
    new RouterLink({ to: '/' });
  });

  it('element should return a', () => {
    const link = new RouterLink({ to: '/' });
    const element = link.element;

    expect(element).to.be.instanceof(window.HTMLAnchorElement)
  });
  
  it('should go to passed route on click', () => {
    const link = new RouterLink({ to: '/' });
    const spy = sinon.spy(Router, 'go');
    const element = link.element as HTMLAnchorElement;

    element.click();

    expect(spy.calledOnce).to.eq(false);
  });
});
