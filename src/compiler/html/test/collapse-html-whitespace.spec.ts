import { mockHtml } from '../../../testing/mocks';
import { collapseHtmlWhitepace } from '../collapse-html-whitespace';


describe('collapseHtmlWhitepace', () => {

  it('should remove empty style attr', () => {
    const node = mockHtml(`
      <p style="">text</p>
    `);

    collapseHtmlWhitepace(node);

    expect(node.outerHTML).toBe(`<p>text</p>`);
  });

  it('should not remove style attr w/ value', () => {
    const node = mockHtml(`
      <p style="color: red">text</p>
    `);

    collapseHtmlWhitepace(node);

    expect(node.outerHTML).toBe(`<p style="color: red">text</p>`);
  });

  it('should remove empty class attr', () => {
    const node = mockHtml(`
      <p class="">text</p>
    `);

    collapseHtmlWhitepace(node);

    expect(node.outerHTML).toBe(`<p>text</p>`);
  });

  it('should not remove class attr w/ value', () => {
    const node = mockHtml(`
      <p class="red-text">text</p>
    `);

    collapseHtmlWhitepace(node);

    expect(node.outerHTML).toBe(`<p class="red-text">text</p>`);
  });

  it('should remove multiple spaces, new lines and comments between used text nodes', () => {
    const node = mockHtml(`
    <div> <i></i>
      text-a <!--comment-a-->
            text-b
          <span>
    <!--comment-b-->
                      </span><b></b>
              <!--comment-c-->        text-c
      </div>
    `);

    collapseHtmlWhitepace(node);

    expect(node.outerHTML).toBe(`<div> <i></i> text-a <!--comment-a--> text-b <span> <!--comment-b--> </span><b></b> <!--comment-c--> text-c </div>`);
  });

  it('should remove multiple spaces and new lines between used text nodes', () => {
    const node = mockHtml(`
    <div>
      text-a
            text-b
          <span>

                      </span>
                      text-c
            </div>
    `);

    collapseHtmlWhitepace(node);

    expect(node.outerHTML).toBe(`<div> text-a text-b <span> </span> text-c </div>`);
  });

  it('should remove multiple spaces and new lines', () => {
    const node = mockHtml(`
    <div>

          <span>

                      </span>

            </div>
    `);

    collapseHtmlWhitepace(node);

    expect(node.outerHTML).toBe(`<div> <span> </span> </div>`);
  });

  it('should remove multiple spaces', () => {
    const node = mockHtml(`<div>   <span>   </span>   </div>`);

    collapseHtmlWhitepace(node);

    expect(node.outerHTML).toBe(`<div> <span> </span> </div>`);
  });

  it('should do nothing for elements with no whitespace', () => {
    const node = mockHtml(`<div><span></span></div>`);

    collapseHtmlWhitepace(node);

    expect(node.outerHTML).toBe(`<div><span></span></div>`);
  });

});
