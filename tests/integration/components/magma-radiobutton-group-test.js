import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('magma-radiobutton-group', 'Integration | Component | magma radiobutton group', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(2);

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{magma-radiobutton-group}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#magma-radiobutton-group}}
      template block text
    {{/magma-radiobutton-group}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
