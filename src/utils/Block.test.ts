import proxyquire from 'proxyquire';
import {expect} from 'chai';
import sinon from 'sinon';
import type BlockType from './Block'

const eventBusMock = {
    on: sinon.fake(),
    emit: sinon.fake(),
}

const {default: Block} = proxyquire('./Block', {
    './EventBus': {
        EventBus: class {
            emit = eventBusMock.emit;
            on = eventBusMock.on;
        }
    }
}) as { default: typeof BlockType };

describe('Block', () => {
    class ComponentMock extends Block {}

    // @ts-ignore
    let block = null;
    beforeEach(() => {
        block = new ComponentMock('div', {});
    });
    it('should fire init event on initialization', () => {
        new ComponentMock('div', {});

        expect(eventBusMock.emit.calledWith('init')).to.eq(true);
    });
    it('Block contains id', () => {
        //@ts-ignore
        expect(block.id).to.be.a('string').to.be.length(6);
    });
    it('setProps() works correct', () => {
        //@ts-ignore
        block.setProps({ name: 'prop' });

        //@ts-ignore
        expect(block.props).to.have.property('name');
    });

});
