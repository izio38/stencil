import { setupDomTests } from '../util';


describe('slot-html', () => {
  const { setupDom, tearDownDom, renderTest } = setupDomTests(document);

  beforeEach(setupDom);
  afterEach(tearDownDom);


  it('renders', async () => {
    let component = await renderTest('/slot-html/index.html');
    component = component.parentElement;
    let result: HTMLElement;
    let results: NodeListOf<HTMLElement>;

    result = component.querySelector('.results1');
    expect(result.textContent.trim()).toBe('');

    result = component.querySelector('.results2 div');
    expect(result.textContent.trim()).toBe('default slot text node');

    results = component.querySelector('.results3 div').querySelectorAll('content-default');
    expect(results[0].textContent.trim()).toBe('default slot element 1');
    expect(results[1].textContent.trim()).toBe('default slot element 2');
    expect(results[2].textContent.trim()).toBe('default slot element 3');

    results = component.querySelectorAll('.results4 div article span content-start[slot="start"]');
    expect(results[0].textContent.trim()).toBe('start slot 1');
    expect(results[1].textContent.trim()).toBe('start slot 2');

    result = component.querySelector('.results4 div content-default');
    expect(result.textContent.trim()).toBe('default slot');

    results = component.querySelectorAll('.results5 div article span content-start[slot="start"]');
    expect(results[0].textContent.trim()).toBe('start slot 1');
    expect(results[1].textContent.trim()).toBe('start slot 2');

    result = component.querySelector('.results5 div');
    expect(result.childNodes[5].textContent.trim()).toBe('default text node');

    results = component.querySelectorAll('.results6 div article span content-start');
    expect(results[0].textContent.trim()).toBe('start slot 1');
    expect(results[1].textContent.trim()).toBe('start slot 2');

    results = component.querySelectorAll('.results6 div content-default');
    expect(results[0].textContent.trim()).toBe('default slot 1');
    expect(results[1].textContent.trim()).toBe('default slot 2');

    results = component.querySelectorAll('.results7 div article span content-start');
    expect(results[0].textContent.trim()).toBe('start slot 1');
    expect(results[1].textContent.trim()).toBe('start slot 2');

    results = component.querySelectorAll('.results7 div content-default');
    expect(results[0].textContent.trim()).toBe('default slot 1');
    expect(results[1].textContent.trim()).toBe('default slot 2');

    results = component.querySelectorAll('.results8 div section content-end[slot="end"]');
    expect(results[0].textContent.trim()).toBe('end slot 1');
    expect(results[1].textContent.trim()).toBe('end slot 2');

    results = component.querySelectorAll('.results9 div section content-end[slot="end"]');
    expect(results[0].textContent.trim()).toBe('end slot 1');
    expect(results[1].textContent.trim()).toBe('end slot 2');

    results = component.querySelectorAll('.results9 div content-default');
    expect(results[0].textContent.trim()).toBe('default slot 1');
    expect(results[1].textContent.trim()).toBe('default slot 2');

    result = component.querySelector('.results10 div');
    expect(result.childNodes[4].textContent.trim()).toBe('default slot 1');
    expect(result.childNodes[6].textContent.trim()).toBe('default slot 2');
    expect(result.childNodes[8].textContent.trim()).toBe('default slot text node');

    result = component.querySelector('.results11 div');
    expect(result.childNodes[1].childNodes[0].childNodes[1].textContent.trim()).toBe('start slot 1');
    expect(result.childNodes[1].childNodes[0].childNodes[2].textContent.trim()).toBe('start slot 2');
    expect(result.childNodes[4].textContent.trim()).toBe('default slot 1');
    expect(result.childNodes[9].textContent.trim()).toBe('default slot 2');
    expect(result.childNodes[11].textContent.trim()).toBe('default slot text node');
    expect(result.childNodes[12].childNodes[1].textContent.trim()).toBe('end slot 1');
    expect(result.childNodes[12].childNodes[2].textContent.trim()).toBe('end slot 2');
  });

});
