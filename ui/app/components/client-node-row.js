import { inject as service } from '@ember/service';
import Component from '@ember/component';
import { lazyClick } from '../helpers/lazy-click';
import { watchRelationship } from 'nomad-ui/utils/properties/watch';

export default Component.extend({
  store: service(),

  tagName: 'tr',
  classNames: ['client-node-row', 'is-interactive'],

  node: null,

  onClick() {},

  click(event) {
    lazyClick([this.get('onClick'), event]);
  },

  didReceiveAttrs() {
    // Reload the node in order to get detail information
    const node = this.get('node');
    if (node) {
      node.reload().then(() => {
        this.get('watch').perform(node, 100);
      });
    }
  },

  willDestroy() {
    this.get('watch').cancelAll();
    this._super(...arguments);
  },

  watch: watchRelationship('allocations'),
});
